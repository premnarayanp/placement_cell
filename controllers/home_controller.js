module.exports.home = async(req, res) => {

    if (req.isAuthenticated()) {

        return res.render('home', {
            title: 'home',
            heading: 'this is home',
            user: true,
        });
    }
    return res.redirect('/users/sign-in');


}