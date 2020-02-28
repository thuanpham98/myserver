module.exports.get = function(req, res) {
    res.render('login', { title: 'Login Page' });
};
module.exports.post = function(req, res) {

    console.log("done login");
    res.redirect('/user');
};