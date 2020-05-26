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
    let account, device;
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
            for (let i = 0; i < result[0].child.length; i++) {
                if (result[0].child[i].port === -1) {
                    pin_free = pin_free + 1;
                    index_free.push(i);
                }
                if (result[0].child[i].port === parseInt(frame.block, 10)) {
                    pin_used = pin_used + 1;
                    result[0].child[i].maskport = frame.mask;
                    index_used.push(i);
                }
                doc[0].child.set(i, result[0].child[i]);
            }
            await doc[0].save();

            console.log(pin_used);
            console.log(pin_free);
            if (frame.num > pin_used)
                if ((frame.num - pin_used) > pin_free) {

                    let child = result[0].child;
                    temp = pin_free;
                    console.log(temp);
                    for (let i = 0; i < temp; i++) {
                        let ind = index_free[i];

                        child[ind].port = frame.block;
                        child[ind].maskport = frame.mask;

                        doc[0].child.set(ind, child[ind]);
                    }
                    await doc[0].save();
                    sta = "done, but only have " + temp.toString();
                }
                else if ((frame.num - pin_used) < pin_free) {
                    let child = result[0].child;
                    temp = frame.num - pin_used;
                    console.log(temp);
                    for (let i = 0; i < temp; i++) {
                        let ind = index_free[i];

                        child[ind].port = frame.block;
                        child[ind].maskport = frame.mask;

                        doc[0].child.set(ind, child[ind]);
                    }
                    await doc[0].save();
                    sta = "done expanse pin";
                }
            else if (frame.num < pin_used) {
                temp = pin_used - frame.num ;
                let child = result[0].child;

                for (let i = 0; i < temp; i++) {
                    let ind = index_used[index_used.length-1 -i];

                    child[ind].maskport = "maskPort";
                    child[ind].port = -1;

                    doc[0].child.set(ind, child[ind]);
                }
                await doc[0].save();
                sta = "done";
            }
        })
    }
    // Free Block 
    else if (frame.act === 0) {
        console.log(frame.block);
        await ManageDev.find({ ID: account[0].timestamp, dev: parseInt(frame.dev, 10) }, function (err, result) {
            let child = result[0].child;
            console.log(child);
            for (let i = 0; i < result[0].child.length; i++) {
                // if(result[0].child[i].port=== parseInt(frame.block,10)){
                console.log(child[i].maskport);
                child[i].maskport = "maskPort";
                child[i].port = -1;
                // }
                result[0].child.set(i, child[i]);
            }
            result[0].save();
        });
        sta = "done remove block"
    }

    // return Client
    res.json({ name: sta });
});

/** manager block */
/** sensors config */
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
    await ManageDev.find({ ID: account[0].timestamp, type: 1 }, function (errr, result) {
        device = result;
        res.render('blocks', { title: "Block Page", dev: device });
    });
});
router.post('/blocks/search', async function (req, res) {

    let account, equipments;
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
    await ManageDev.find({ ID: account[0].timestamp, mask: frame.mask }, function (err, result) {
        equipments = result;
        if (equipments.length) {

            res.json({ pathDev: equipments[0].dev.toString() })
        }
        else {
            res.json({ pathDev: '' });
        }
    });
});
router.get('/blocks/:id', async function (req, res) {
    //res.json({id : req.params.id});
    let account, equipments;
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
    let devi = parseInt(req.params.id, 10);
    console
    await ManageDev.find({ ID: account[0].timestamp, dev: devi }, function (err, result) {
        equipments = result;
        res.render('equips', { title: "Equipi Page", name: equipments[0].mask, equips: equipments[0].child, dev: equipments[0].dev, numEquipi: equipments[0].child.length });
    });
})
/* export home */
module.exports = router