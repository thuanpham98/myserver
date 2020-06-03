"use strict"
/** module express */
var express = require('express');
var router = express.Router();

/** module timestamp */
var timestamp = require('../models/timestamp');
router.use(timestamp);

/* modal  managedev */
var ManageDev = require('../models/manageDev');

/* modal  user */
var User = require('../models/user');

/** modal command */
var Command = require('../models/command');

/* module  check error */
var assert = require('assert');

/* module JWT */
var jwt = require('jsonwebtoken');
// ---------------------------------------------------

/** dev config */
router.get('/', function (req, res) {
    res.render('guis', { title: "Gui Page" });
});
router.post('/', async function (req, res) {
    let account;
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);
    let frame = req.body;
    let sta;
    /* check token on database */
    await User.find({ email: decoded.accessToken }, function (err, result) {
        assert.equal(null, err);
        account = result;

        if (!account.length) {
            res.json("no user");
            return;
        }
    });
    // console.log(req.body);
    // await ManageDev.find({ ID: account[0].timestamp, "child.port" : 2 }, async function (errr, result) {
    //     device=result;
    //     console.log(result);
    // });

    // Make Block
    if (frame.act === 1) {
        await ManageDev.find({ ID: account[0].timestamp, dev: parseInt(frame.dev, 10) }, async function (err, doc) {
            let result = doc;
            let pin_free = 0; /** so chan free cua dev */
            let pin_used = 0; /** so chan free cua dev */
            let temp = 0;
            let index_used = [];
            let index_free = [];
            console.log(result[0].child.length);
            console.log("start filter");
            for (let i = 0; i < result[0].child.length; i++) {
                if (result[0].child[i].port === -1) {
                    pin_free = pin_free + 1;
                    index_free.push(i);
                }

                if (result[0].child[i].port === frame.block) {
                    pin_used = pin_used + 1;
                    index_used.push(i);
                    result[0].child[i].maskport = frame.mask;
                    console.log(pin_used);

                }
                doc[0].child.set(i, result[0].child[i]);
            }
            console.log("end filter");
            sta = "mask is update";
            await doc[0].save();


            console.log(index_free);
            console.log("-------");
            console.log(index_used);

            if (parseInt(frame.num, 10) > pin_used) {
                if ((parseInt(frame.num, 10) - pin_used) >= pin_free) {

                    console.log("TH1a");
                    let child = result[0].child;
                    temp = pin_free;
                    console.log(temp);
                    /** expanse more pin */
                    for (let i = 0; i < temp; i++) {
                        let ind = index_free[i];

                        child[ind].port = frame.block;
                        child[ind].maskport = frame.mask;

                        doc[0].child.set(ind, child[ind]);
                    }
                    /** syn mask again */
                    for (let i = 0; i < index_used.length; i++) {
                        let ind = index_used[i];

                        child[ind].port = frame.block;
                        child[ind].maskport = frame.mask;

                        doc[0].child.set(ind, child[ind]);
                    }

                    sta = "done, but only have " + temp.toString();
                    await doc[0].save();

                }
                else if ((parseInt(frame.num, 10) - pin_used) < pin_free) {
                    console.log("TH1b");
                    let child = result[0].child;
                    temp = frame.num - pin_used;
                    console.log(temp);
                    /** expanse */
                    for (let i = 0; i < temp; i++) {
                        let ind = index_free[i];

                        child[ind].port = frame.block;
                        child[ind].maskport = frame.mask;

                        doc[0].child.set(ind, child[ind]);
                    }
                    /** syn mask */
                    for (let i = 0; i < index_used.length; i++) {
                        let ind = index_used[i];

                        child[ind].port = frame.block;
                        child[ind].maskport = frame.mask;

                        doc[0].child.set(ind, child[ind]);
                    }
                    await doc[0].save();
                }
            }
            else if (parseInt(frame.num, 10) < pin_used) {
                console.log("TH2");
                temp = pin_used - frame.num;
                console.log(temp)
                let child = result[0].child;

                for (let i = 0; i < temp; i++) {
                    let ind = index_used[index_used.length - 1 - i];

                    child[ind].maskport = "maskPort";
                    child[ind].port = -1;
                    child[ind].pin = ind;

                    doc[0].child.set(ind, child[ind]);
                }
                doc[0].save();
            }
        })

        sta = "mask is expanded";
    }
    // Free Block 
    else if (frame.act === 0) {
        console.log(frame.block);
        console.log(typeof (frame.block))

        await ManageDev.find({ ID: account[0].timestamp, dev: parseInt(frame.dev, 10) }, function (err, result) {
            let child = result[0].child;

            for (let i = 0; i < child.length; i++) {
                if (child[i].port === parseInt(frame.block, 10)) {
                    child[i].maskport = "maskPort";
                    child[i].port = -1;
                    console.log(child[i].port);
                }

                result[0].child.set(i, child[i]);
            }
            result[0].save();
        });

        sta = "done remove block";
    }

    // return Client
    res.json({ name: sta });
});

/** manager block */
router.get('/blocks', async function (req, res) {


    let account, device;
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);

    /* check token on database */
    await User.find({ email: decoded.accessToken }, function (err, result) {
        assert.equal(null, err);
        account = result;

        if (!account.length) {
            res.json("no user");
            return;
        }
    });
    await ManageDev.find({ ID: account[0].timestamp, type: 0 }, function (errr, result) {
        device = result;
        let block = [];
        let name_block = [];
        if (device.length) {
            for (let i = 0; i < device.length; i++) {
                for (let j = 0; j < device[i].child.length; j++) {
                    if (device[i].child[j].port !== -1) {
                        block.push(device[i].child[j].port);
                        name_block.push(device[i].child[j].maskport);

                    }
                }
            }
        }

        let arr_block = block.reduce(function (obj, item) {
            obj[item] = (obj[item] || 0) + 1;
            return obj;
        }, {});
        name_block = name_block.reduce(function (obj, item) {
            obj[item] = (obj[item] || 0) + 1;
            return obj;
        }, {});

        let item_block = Object.keys(arr_block);
        let number_block = Object.values(arr_block);
        name_block = Object.keys(name_block);

        res.render('blocks', { title: "Block Page", block_item: item_block, block_number: number_block, block_name: name_block });
    });
});
router.post('/blocks', async function (req, res) {
    let account, comma;
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);

    /* check token on database */
    await User.find({ email: decoded.accessToken }, function (err, result) {
        assert.equal(null, err);
        account = result;

        if (!account.length) {
            res.json({ status: "no user" });
            return;
        }
    });
    /** check device of user */
    let frame = req.body;

    await ManageDev.find({ ID: account[0].timestamp, dev: parseInt(frame.dev, 10), type: 0 }, async function (err, result) {
        if (result.length) {
            console.log(result[0].child);
            let child = result[0].child;
            for (let i = 0; i < child.length; i++) {
                if ((child[i].port == frame.port) && (child[i].pin == frame.pin)) {

                    child[i].value = parseInt(frame.value, 10);
                    result[0].child.set(i, child[i]);
                    console.log("fined it");
                }
            }
            await result[0].save();
            res.send({ status: "ok" });
        }
        else {
            res.send({ status: "no pin" });
        }
    });

    comma = {
        ID: account[0].timestamp,
        timestamp: new Date().toLocaleString('en-US', { timeZone: process.env.TIME_ZONE }),
        device: parseInt(frame.dev, 10),
        io: parseInt(frame.pin, 10),
        value: parseInt(frame.value, 10),
    };
    let ret = await Command.create(comma);
    console.log(ret);

});
router.post('/blocks/search', async function (req, res) {

    let account, blocks;
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);

    /* check token on database */
    await User.find({ email: decoded.accessToken }, function (err, result) {
        assert.equal(null, err);
        account = result;

        if (!account.length) {
            res.json("no user");
            return;
        }
    });
    /** check device of user */
    let frame = req.body;

    await ManageDev.find({ ID: account[0].timestamp, type: 0, "child.maskport": frame.mask }, function (err, result) {
        blocks = result;
        let res_search;
        if (blocks.length) {

            for (let i = 0; i < blocks[0].child.length; i++) {
                if (blocks[0].child[i].maskport == frame.mask) {
                    res_search = blocks[0].child[i].port;
                    console.log(res_search);
                    break
                }
            }
            res.json({ pathDev: res_search })
        }
        else {
            res.json({ pathDev: '' });
        }
    });
});
router.get('/blocks/:id', async function (req, res) {

    let account, blocks, blockManager = [];
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);

    /* check token on database */
    await User.find({ email: decoded.accessToken }, function (err, result) {
        assert.equal(null, err);
        account = result;

        if (!account.length) {
            res.json("no user");
            return;
        }
    });

    /** check Block of user */
    let indexBlock = req.params.id;
    await ManageDev.find({ ID: account[0].timestamp, type: 0, 'child.port': indexBlock }, function (errr, result) {
        // equipments = result;
        // res.render('equips', { title: "Equipi Page", name: equipments[0].mask, equips: equipments[0].child, dev: equipments[0].dev, numEquipi: equipments[0].child.length });

        blocks = result;
        if (blocks.length) {
            for (let i = 0; i < blocks.length; i++) {
                for (let j = 0; j < blocks[i].child.length; j++) {
                    if (blocks[i].child[j].port === indexBlock) {
                        blockManager.push({ dev: blocks[i].dev, mask: blocks[i].mask, block: blocks[i].child[j] });
                    }
                }
            }
            res.render('blocki', { title: "Control Block Page", name: blockManager[0].block.maskport, port: indexBlock, blocks: blockManager });
        }
        else {
            res.send("no data looking");
        }
    });

    
})
/* export home */
module.exports = router