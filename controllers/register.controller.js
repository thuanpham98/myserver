module.exports.get = function(req, res) {
    res.render('register', { title: 'Register Page' })
};

module.exports.post = function(req, res) {

    console.log("done make account");
    res.redirect('/login');
};