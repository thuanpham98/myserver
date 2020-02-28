//--module bcrypt---//
const bcrypt = require('bcrypt');


//----------------------------//
//---------------------------//
module.exports.get = function(req, res) {
    res.render('login', { title: 'Login Page' });
};
module.exports.post = async function(req, res) {


    match = await bcrypt.compare(req.body.pass, res.locals.pass);
    console.log(match);

    if (!match) {
        res.render('login', { title: 'Login Page', status: "password incorrect" });


    } else res.redirect('/user');
};