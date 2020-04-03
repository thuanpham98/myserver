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

    res.render('display',{title :"Display Page"});

});
router.get('/getdata', async function(req, res) {
   
    let account;
    let data;

    let decoded = await jwt.verify(req.cookies.access_token, process.env.PRIVATE_KEY);

    //check token on database--//
    await User.find({ email: decoded.accessToken }, async function(err, result) {
        assert.equal(null, err);
        account = result[0];

        if((account!==undefined) && (account!=="no data")){
            await Data.find({ ID: account.timestamp}, function(err, result) {
                assert.equal(null, err);
                if (!result.length) {
                    console.log("no data");

                    let m_data=[0,0,0,0,0,0,0,0,0,0];
                    let m_label= Data();
                    respp={label: m_label,data: m_data};
                    respp=JSON.stringify(respp);
                
                    //console.log(respp);
                    
                    res.send(respp);
                }
                
                //{((data!==undefined) && (data!=="no data"))
                else 
                {
                    data=result;
                    let m_label=data[0].timestamp;
                    //m_labe=m_label.toString();
                    let m_data=[data[0].form.sensor_1,data[0].form.sensor_2,
                                data[0].form.sensor_3,data[0].form.sensor_4,
                                data[0].form.sensor_5,data[0].form.sensor_6,
                                data[0].form.sensor_7,data[0].form.sensor_8,
                                data[0].form.sensor_9,data[0].form.sensor_10
                            ];
                
                    // for(let i =data.length ; i >0;i --)
                    // {
                    //     m_label.push(data[i-1].timestamp);
                    //     m_data.push(data[i-1].form.sensor_1);
                    // }
                    //console.log(m_data);
                
                    respp={label: m_label,data: m_data};
                    respp=JSON.stringify(respp);
                
                    //console.log(respp);
                    
                    res.send(respp);
                }
                
            }).sort({ _id: -1 }).limit(1);
        }
    });

});



//----export----/
module.exports = router