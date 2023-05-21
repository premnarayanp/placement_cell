module.exports.home = async(req, res) => {
    return res.render('home', {
        title: 'home',
        heading: 'this is home',
        user: true,
    });

}