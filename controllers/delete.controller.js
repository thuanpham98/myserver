module.exports.get = function(req, res) {
    res.render('delete', { title: 'Delete Page' });
};
module.exports.post = function(req, res) {
    console.log("login success");
    res.redirect('/user/logout');
};