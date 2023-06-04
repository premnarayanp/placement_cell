module.exports.posts = async(req, res) => {
    if (req.isAuthenticated()) {
        try {
            return res.render('jobsPosts', {
                title: 'jobsPosts',
                heading: 'this is jobsPosts',
                jobsPosts: 'https://jobs.github.com/api'
            });

        } catch (error) {
            console.log('error in finding batch');
            res.redirect('back');
        }
    }

}