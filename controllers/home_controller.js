const Batch = require('../models/batch')
module.exports.home = async(req, res) => {

    if (req.isAuthenticated()) {

        try {

            const batches = await Batch.find({})
                .populate('user')
                .populate({
                    path: 'students',
                    populate: {
                        path: 'user'
                    }
                });


            return res.render('home', {
                title: 'Students',
                batches: batches
            });

        } catch (error) {
            console.log('error in finding students');

        }







        //     try {
        //         const batches = await Batch.find({}).populate('user');

        //         return res.render('home', {
        //             title: 'home',
        //             heading: 'this is home',
        //             batches: batches
        //         });

        //         // if (batches) {
        //         //     return res.redirect(locals.batches = batches);
        //         // }

        //     } catch (error) {
        //         console.log('error in finding batch');

        //     }


        //     return res.render('home', {
        //         title: 'home',
        //         heading: 'this is home',
        //     });



    }
    return res.redirect('/users/sign-in');

}