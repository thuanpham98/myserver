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
router.post('/',function(req,res){
    let account,device;
    var decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);

    /* check token on database */
    await User.find({ email: decoded.accessToken }, function(err, result) {
        assert.equal(null, err);
        account = result;
        
        if (!account.length) {
            res.json("no user");
        }
    });

    if(req.body.act){
        await ManageDev.find({ID : account[0].ID,dev : req.body.dev},async function(errr,result){
            assert.equal(null, err);
            device = result;
            
            if (device.length) {
                result[0].timestamp=Date.now();
                result[0].dev=req.body.dev;
                result[0].mask=req.body.mask;
                result[0].type=req.body.type;
                result[0].save();
            }
            else {
                let child =[{mask:"mask1",type: 0},{mask:"mask2",type: 0},{mask:"mask3",type: 0},{mask:"mask4",type: 0},{mask:"mask5",type: 0},
                            {mask:"mask6",type: 0},{mask:"mask7",type: 0},{mask:"mask8",type: 0},{mask:"mask9",type: 0},{mask:"mask10",type: 0},
                            {mask:"mask11",type: 1},{mask:"mask12",type: 1},{mask:"mask13",type: 1},{mask:"mask14",type: 1},{mask:"mask15",type: 1},
                            {mask:"mask16",type: 1},{mask:"mask17",type: 1},{mask:"mask18",type: 1},{mask:"mask19",type: 1},{mask:"mask20",type: 1}
                            ];
                await ManageDev.create({
                    ID: account[0].ID,
                    timestamp:Date.now(),
                    dev : req.body.dev,
                    mask: req.body.mask,
                    type : req.body.type,
                    child : child
                }, function(err2, doc) {
                    if (err2) {
                        console.error(err2);
                        throw err2;
                    }
                    console.log(doc);
                });
            }
        });
        res.json("added");
    }
    else {
        console.log("start delete ");
        await ManageDev.deleteOne({ID: account[0].ID,dev : req.body.dev}, function (err, result) {
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
router.get('/sensors',function(req,res){
    let device =[{mask: "thuan", type : 0},{mask:"thao",type : 1}]
    res.render('sensors', { title: "Sensor Page" , dev: device});
});
router.get('/sensors/:id',function(req,res){
    res.json({id : req.params.id});
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