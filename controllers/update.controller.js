/* module hash */
var bcrypt = require('bcrypt');

/* modal User */
var User = require('../models/user');

module.exports.get = function(req, res) {
    res.render('update', {
        title: "Update page"
    });
};
module.exports.post = async function(req, res) {

    let hash = await bcrypt.hash(req.body.n_pass, 10);

    User.find({ email: req.body.email }, function(err, doc) {
        doc[0].password = hash;
        doc[0].save();
    });

    console.log("done");
    res.render('success', {
        title: "Update page",
        status: "Update sucessful, log out to check or return user"
    });
};