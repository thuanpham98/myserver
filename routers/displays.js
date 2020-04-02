var express = require('express');
var router = express.Router();

//---timestamp module  if have a even happen---//
var timestamp = require('../models/timestamp');
router.use(timestamp);

// modal Data---//
var Data = require('../models/data');

//---module  user---//
var User = require('../models/user');

//---module  check error ---//
var assert = require('assert');

//--module JWT --//
var jwt = require('jsonwebtoken');

//-------------display----------//
router.get('/', async function(req, res) {

    res.render('test',{title :"test"});

});
router.get('/test', async function(req, res) {
    console.log(req.cookies.access_token);

    let account;
    let data;

    var decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);

    //check token on database--//
    await User.find({ email: decoded.accessToken }, function(err, result) {
        assert.equal(null, err);
        account = result[0];
    });
    console.log(account);

    await Data.find({ ID: account.timestamp}, function(err, result) {
        assert.equal(null, err);
        if (!result.length) {
            console.log("no data");
        }
        data=result;
    }).sort({ _id: -1 }).limit(1);

    console.log(data);
    if(data!=undefined)
    {
        var m_label=data[0].timestamp;
        m_labe=m_label.toString();
        var m_data=[data[0].form.sensor_1,data[0].form.sensor_2];
    
        // for(let i =data.length ; i >0;i --)
        // {
        //     m_label.push(data[i-1].timestamp);
        //     m_data.push(data[i-1].form.sensor_1);
        // }
        console.log(m_data);
    
        respp={label: m_label,data: m_data};
        respp=JSON.stringify(respp);
    
        console.log(respp);
        
        res.send(respp);
    }

});



//----export----/
module.exports = router