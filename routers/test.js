//----module make http server -----//
var express = require('express');
var router = express.Router();

//---timestamp module  if have a even happen---//
var timestamp = require('../models/timestamp');
router.use(timestamp);


//------------------------------------//
router.get('/', function(req, res) {
    res.render('GUI_PWM',{title: 'GUI Page' ,

    Dev_0 : "device 0",Dev_1 : "device 1",Dev_2 : "device 2",Dev_3 : "device 3",

    Pin_0 : "lam0",Pin_2 : "lam2",Pin_4 : "lam4",Pin_5 : "lam5",
    Pin_12: "lam12",Pin_13 : "lam13",Pin_14 : "lam14",Pin_15 : "lam15",
    Pin_18: "lam18",Pin_19 : "lam19",Pin_21 : "lam21",Pin_22 : "lam22",
    Pin_23 : "lam23",Pin_27 : "lam27",Pin_32 : "lam32",Pin_33 : "lam33",

    });
});

router.post('/', function(req, res) {


    console.log(req.body.te);

});

//------export module-------//
module.exports = router