//render Sign in Page
module.exports.signIn = function(req, res) {
    console.log('you are in signIn');
    return res.render('user_sign_in', {
        title: "Placements Cell | SignIn",
        heading: 'this is signIn',
        user: true,
    });
};

//render Sign Up Page
module.exports.signUp = function(req, res) {
    console.log('you are in signUp');
    return res.render('user_sign_up', {
        title: "Placements Cell | SignUp",
        heading: 'this is signUp',
        user: true,
    });
};

module.exports.logout = function(req, res) {
    console.log('you are in signOut');
    return res.render('user_sign_out', {
        title: "Placements Cell | SignOUt",
        heading: 'this is SignOUt',
        user: true,
    });
};