"use strict"
/** module express */
var express = require('express');
var router = express.Router();

/** module timestamp */
var timestamp = require('../models/timestamp');
router.use(timestamp);

/* modal  managedev */
var ManageDev =require('../models/manageDev');

/* modal  user */
var User = require('../models/user');

/* module  check error */
var assert = require('assert');

/* module JWT */
var jwt = require('jsonwebtoken');
// ---------------------------------------------------

/** dev config */
router.get('/',function(req,res){
    res.render('config', { title: "Config Page" });
});
router.post('/', async function(req,res){
    let account,device;
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);

    /* check token on database */
    await User.find({ email: decoded.accessToken }, function(err, result) {
        assert.equal(null, err);
        account = result;
        
        if (!account.length) {
            res.json("no user");
            return;
        }
    });

    if(req.body.act){
        await ManageDev.find({ID : account[0].timestamp,dev : req.body.dev},async function(errr,result){
            // assert.equal(null, err);
            device = result;
            
            if (device.length) {
                result[0].timestamp=Date.now();
                result[0].dev=req.body.dev;
                result[0].mask=req.body.mask;
                result[0].type=req.body.type;
                result[0].save();
            }
            else {
                let child =[{mask:"mask1",type: 0,act:false},{mask:"mask2",type: 0,act:false},{mask:"mask3",type: 0,act:false},{mask:"mask4",type: 0,act:false},{mask:"mask5",type: 0,act:false},
                            {mask:"mask6",type: 0,act:false},{mask:"mask7",type: 0,act:false},{mask:"mask8",type: 0,act:false},{mask:"mask9",type: 0,act:false},{mask:"mask10",type: 0,act:false},
                            {mask:"mask11",type: 1,act:false},{mask:"mask12",type: 1,act:false},{mask:"mask13",type: 1,act:false},{mask:"mask14",type: 1,act:false},{mask:"mask15",type: 1,act:false},
                            {mask:"mask16",type: 1,act:false},{mask:"mask17",type: 1,act:false},{mask:"mask18",type: 1,act:false},{mask:"mask19",type: 1,act:false},{mask:"mask20",type: 1,act:false}
                            ];
                await ManageDev.create({
                    ID: account[0].timestamp,
                    timestamp:Date.now(),
                    dev : req.body.dev,
                    mask: req.body.mask,
                    type : req.body.type,
                    child : child
                }, function(err2, doc) {
                    // if (err2) {
                    //     console.error(err2);
                    //     throw err2;
                    // }
                    console.log(doc);
                });
            }
        });
        res.json("added");
    }
    else {
        console.log("start delete ");
        await ManageDev.deleteOne({ID: account[0].timestamp,dev : req.body.dev}, function (err, result) {
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
router.get('/sensors',async function(req,res){

    // let device =[{mask: "thuan", type : 0},{mask:"thao",type : 1}]
    let account,device;
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);

    /* check token on database */
    await User.find({ email: decoded.accessToken }, function(err, result) {
        assert.equal(null, err);
        account = result;
        
        if (!account.length) {
            res.json("no user");
            return;
        }
    });
    await ManageDev.find({ID : account[0].timestamp, type : 1 },function(errr,result){
        device = result;
        res.render('sensors', { title: "Sensor Page" , dev: device});
    });
});
router.post('/sensors',async function(req,res){

    let account;
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);

    /* check token on database */
    await User.find({ email: decoded.accessToken }, function(err, result) {
        assert.equal(null, err);
        account = result;
        
        if (!account.length) {
            res.json("no user");
            return;
        }
    });

    let frame = req.body;
    console.log(frame);
    // update sensors
    await ManageDev.find({ID : account[0].timestamp, dev : parseInt(frame.dev, 10), mask : frame.mask },async function(err,result){
        let ind= parseInt(frame.child.index,10);
        console.log(result[0].child);
        console.log(frame.action);
        switch(parseInt(frame.action,10)){
            case 0 :
                console.log("status 0");
                console.log(frame.child.status);
                console.log(result[0].child[ind].act);
                result[0].child[ind].act = frame.child.status;
                break;
                
            case 1 : 
                console.log("ok");
                break;
            case 2: 
                console.log("ok");
                break;
        }
        console.log("ok save");
        await result[0].save();
    });

    res.json({name: "ok user"});
});
router.get('/sensors/:id',async function(req,res){
    //res.json({id : req.params.id});
    let account,sensors;
    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);

    /* check token on database */
    await User.find({ email: decoded.accessToken }, function(err, result) {
        assert.equal(null, err);
        account = result;
        
        if (!account.length) {
            res.json("no user");
            return;
        }
    });

    /** check device of user */
    let devi =parseInt(req.params.id, 10);
    await ManageDev.find({ID : account[0].timestamp, dev : devi},function(err,result){
        sensors = result;
        res.render('sens', { title: "Sensi Page" , name: sensors[0].mask ,sens: sensors[0].child, dev : sensors[0].dev});
    });
});


/** euipments config */
router.get('/equipments',function(req,res){
    let device =[{mask: "thuan", type : 0},{mask:"thao",type : 1}]
    res.render('equipments', { title: "Sensor Page" , dev: device});
})
router.get('/equipments/:id',function(req,res){
    let device =[{mask: "thuan", type : 0},{mask:"thao",type : 1}]
    res.json({id : req.params.id});
})



/* export user/GUI */ 
module.exports = router