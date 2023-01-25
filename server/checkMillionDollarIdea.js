const checkMillionDollarIdea = (req, res, next) => {

    const numWeeks = req.body.numWeeks;
    const weeklyRevenue = req.body.weeklyRevenue;
    const total = numWeeks * weeklyRevenue;
    if(!numWeeks || !weeklyRevenue || !total || total < 1000000){
        res.status(400).send('Idea must be worth at least $1,000,000');
    }else{
        next();
    }

};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
