module.exports.get = function(req, res) {
    res.render('login', { title: 'Login Page' });
};
module.exports.post = function(req, res) {
    console.log("login success");
    res.redirect('/user');
};

// function logOut() {
//     let payload = loggingSessions.get(access_token)
//     payload.exp = new Date();
// }