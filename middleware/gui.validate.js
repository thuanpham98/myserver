module.exports.checkFilled = function(req, res, next) {
    let error = [];
    if (!req.body.device) {
        error.push('email is not fill');
    }
    if (!req.body.pass) {
        error.push('pass is not fill');
    }
    if (error.length) {
        res.render('login', { title: 'Login Page', status: error });
        return;
    }
    next();
};

