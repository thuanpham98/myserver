module.exports.get = function(req, res) {
    res.render('login', { title: 'Login Page' });
};
module.exports.post = async function(req, res) {

    //--object store information user post--//
    let user = {
        id_t: Date.now(),
        id_s: ' ',
        email: req.body.email,
        password: req.body.pass
    };
    var test_pass;
    client.connect(function(err) {
        assert.equal(null, err);
        let account = client.db('account');
        let query = { email: user.email };
        account.collection("user_account").find(query).toArray(function(err, result) {
            assert.equal(null, err);
            test_pass = result[0].password;
            console.log(test_pass);

            // bcrypt.compare(a_account.pass, result.password, function(err, result) {
            //     res.redirect('/user');
            //     console.log(result);
        });
    });
    console.log(test_pass);
    // try {
    //     await bcrypt.compare(test_pass, user.password, function(err, result) {
    //         assert.equal(null, err);
    //         if (result) {
    //             console.log('passsingg ');
    //         } else console.log("Failed");
    //     });
    //     res.redirect('/user');
    // } catch {
    //     res.redirect('/login');
    // }
};