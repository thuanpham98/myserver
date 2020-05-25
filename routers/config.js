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
    res.render('config', { title: "Config Page" });
});
router.post('/', async function (req, res) {
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

    if (req.body.act) {
        await ManageDev.find({ ID: account[0].timestamp, dev: parseInt(req.body.dev, 10) }, async function (errr, result) {
            // assert.equal(null, err);
            device = result;

            if (device.length) {
                result[0].timestamp = Date.now();
                result[0].dev = req.body.dev;
                result[0].mask = req.body.mask;
                result[0].type = req.body.type;
                if (req.body.num > result[0].child.length) {
                    if (parseInt(req.body.type, 10) === 1) {
                        for (let i = result[0].child.length; i < req.body.num; i++) {
                            result[0].child.push({ mask: ("mask" + i.toString()), type: 0, act: false });
                        }
                        result[0].save();
                    }
                    if (parseInt(req.body.type, 10) === 0) {
                        for (let i = result[0].child.length; i < req.body.num; i++) {
                            result[0].child.push({ mask: ("mask" + i.toString()), maskport: "maskPortx", type: 0, value: 0, port: -1, pin: i, act: false });
                        }
                        result[0].save();
                    }
                }
                else if (req.body.num < result[0].child.length) {
                    for (let i = result[0].child.length; i > req.body.num; i--) {

                        result[0].child.pop();
                    }
                    result[0].save();
                }

            }
            else {
                if (parseInt(req.body.type, 10) === 1) {

                    let child = [];
                    for (let i = 0; i < parseInt(req.body.num, 10); i++) {
                        child.push({ mask: ("mask" + i.toString()), type: 0, act: false });
                    }
                    await ManageDev.create({
                        ID: account[0].timestamp,
                        timestamp: Date.now(),
                        dev: req.body.dev,
                        mask: req.body.mask,
                        type: req.body.type,
                        child: child
                    }, function (err2, doc) {
                        console.log(doc);
                    });
                }
                else if (parseInt(req.body.type, 10) === 0) {

                    let child = [];
                    for (let i = 0; i < parseInt(req.body.num, 10); i++) {
                        child.push({ mask: ("mask" + i.toString()), maskport: "maskPortx", type: 0, value: 0, port: -1, pin: i, act: false });
                    }
                    await ManageDev.create({
                        ID: account[0].timestamp,
                        timestamp: Date.now(),
                        dev: req.body.dev,
                        mask: req.body.mask,
                        type: req.body.type,
                        child: child
                    }, function (err2, doc) {
                        console.log(doc);
                    });
                }

            }
        });
        res.json("added");
    }
    else {
        console.log("start delete ");
        await ManageDev.deleteOne({ ID: account[0].timestamp, dev: req.body.dev }, function (err, result) {
            if (err) {
                console.log("error query");
            } else {

                console.log(result);
            }
        }).sort({ _id: -1 }).limit(1);
        console.log("end deleta");
        res.json("removed");
    }
});
// ---------------------------------------

/** sensors config */
router.get('/sensors', async function (req, res) {

    // let device =[{mask: "thuan", type : 0},{mask:"thao",type : 1}]
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
        res.render('sensors', { title: "Sensor Page", dev: device });
    });
});
router.post('/sensors', async function (req, res) {

    let account;
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

    // update sensors
    let frame = req.body;
    let dev_num = parseInt(frame.dev, 10);

    switch (parseInt(frame.action, 10)) {
        case 0:

            await ManageDev.find({ ID: account[0].timestamp, dev: dev_num }, async function (err, result) {

                let ind = parseInt(frame.child.index, 10);
                let child = result[0].child[ind];
                child.act = frame.child.status;
                result[0].child.set(ind, child);
                await result[0].save();
            });
            break;

        case 1:

            await ManageDev.find({ ID: account[0].timestamp, dev: dev_num }, async function (err, result) {

                let ind = parseInt(frame.child.index, 10);
                let child = result[0].child[ind];
                child.type = frame.child.type;
                result[0].child.set(ind, child);
                await result[0].save();
            });
            break;

        case 2:

            await ManageDev.find({ ID: account[0].timestamp, dev: dev_num }, async function (err, result) {

                let child = result[0].child;
                for (let i = 0; i < frame.child.length; i++) {
                    let ind = frame.child[i].index;
                    child[ind].mask = frame.child[i].mask;
                    result[0].child.set(ind, child[ind]);
                }
                await result[0].save();
            });
            break;

        default:
            break;
    }
    res.json({ name: "ok user" });
});
router.post('/sensors/search', async function (req, res) {
    
    let account, sensors;
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
        sensors = result;
        if (sensors.length) {

            res.json({ pathDev: sensors[0].dev.toString() })
        }
        else {
            res.json({ pathDev: '' });
        }
    });
})
router.get('/sensors/:id', async function (req, res) {
    //res.json({id : req.params.id});
    let account, sensors;
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
    await ManageDev.find({ ID: account[0].timestamp, dev: devi }, function (err, result) {
        sensors = result;
        res.render('sens', { title: "Sensi Page", name: sensors[0].mask, sens: sensors[0].child, dev: sensors[0].dev, numSensi: sensors[0].child.length });
    });
});


/** euipments config */
router.get('/equipments', async function (req, res) {
        // let device =[{mask: "thuan", type : 0},{mask:"thao",type : 1}]
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
            res.render('equipments', { title: "Equipment Page", dev: device });
        });
})
router.post('/equipments', async function (req, res) {

    let account;
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);

    /* check token on database */
    await User.find({ email: decoded.accessToken }, function (err, result) {
        assert.equal(null, err);
        account = result;

        if (account.length===0) {
            res.json("no user");
            return;
        }
    });

    // update sensors
    let frame = req.body;
    console.log(frame);

    let dev_num =parseInt(frame.dev,10);

    switch (parseInt(frame.action, 10)) {
        case 0:

            await ManageDev.find({ ID: account[0].timestamp, dev: dev_num }, async function (err, result) {

                let ind = parseInt(frame.child.index, 10);
                let child = result[0].child[ind];
                child.act = frame.child.status;
                result[0].child.set(ind, child);
                await result[0].save();
            });
            break;

        case 1:

            await ManageDev.find({ ID: account[0].timestamp, dev: dev_num }, async function (err, result) {

                let ind = parseInt(frame.child.index, 10);
                let child = result[0].child[ind];
                child.type = frame.child.type;
                result[0].child.set(ind, child);
                await result[0].save();
            });
            break;

        case 2:

            await ManageDev.find({ ID: account[0].timestamp, dev: dev_num }, async function (err, result) {

                let child = result[0].child;
                for (let i = 0; i < frame.child.length; i++) {
                    let ind = frame.child[i].index;
                    child[ind].mask = frame.child[i].mask;
                    result[0].child.set(ind, child[ind]);
                }
                await result[0].save();
            });
            break;

        case 3:

            await ManageDev.find({ ID: account[0].timestamp, dev: dev_num }, async function (err, result) {

                let child = result[0].child;
                for (let i = 0; i < frame.child.length; i++) {
                    let ind = frame.child[i].index;
                    child[ind].maskport = frame.child[i].maskport;
                    result[0].child.set(ind, child[ind]);
                }
                await result[0].save();
            });
            break;

        case 4:

            await ManageDev.find({ ID: account[0].timestamp, dev: dev_num }, async function (err, result) {

                let child = result[0].child;
                for (let i = 0; i < frame.child.length; i++) {
                    let ind = frame.child[i].index;
                    child[ind].port = parseInt(frame.child[i].port,10);
                    result[0].child.set(ind, child[ind]);
                }
                await result[0].save();
            });
            break;

        case 5:

            await ManageDev.find({ ID: account[0].timestamp, dev: dev_num }, async function (err, result) {

                let child = result[0].child;
                for (let i = 0; i < frame.child.length; i++) {
                    let ind = frame.child[i].index;
                    child[ind].pin = parseInt(frame.child[i].pin,10);
                    result[0].child.set(ind, child[ind]);
                }
                await result[0].save();
            });
            break;

        default:
            break;
    }

    await ManageDev.find({ ID: account[0].timestamp,type : 0, 'child.type': 1}, async function (err, doc) {
        let ret = doc;
        if(ret.length){
            for(let i =0; i < ret.length;i++){
                console.log(ret[i]);
                console.log("-----------");
                console.log(ret[i].child);
            }
        }
    });

    res.json({ name: "ok user" });
});
router.post('/equipments/search' ,async function (req, res) {
    
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
router.get('/equipments/:id', async function (req, res) {
        //res.json({id : req.params.id});
        let account,equipments ;
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



/* export user/GUI */
module.exports = router