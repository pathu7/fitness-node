const gymLocatorService = require('../service/gymLocatorService')

module.exports.createGym = async (req,res,next) =>{
    try {
        let CreateGym = await gymLocatorService.createGym(req.body)
        if (CreateGym.status) {
            return res.status(200).send({
                message: 'Gym created',
                status: true
            })
        } else {
            res.status(500).send({ status: false, error: err })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });        
    }
}

module.exports.getGymById = async (req, res, next) => {
    try {

        const id = req.query._id

        let gym = await gymLocatorService.findGymById(id)
        // console.log(exercise);
        if (!gym.status) return res.status(500).send({ status: false, error: 'Internal Server Error!.' });
        if (!gym.result) return res.status(200).send({ status: false, error: 'Gym Not Present!!!' });

        return res.status(200).send(gym);
    } catch (err) { 
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });
    }
}

module.exports.getGymByLocation = async (req, res, next) => {
    try {

        const location = req.query.location

        let gym = await gymLocatorService.findGymByLocation(location)
        // console.log(gym,!!gym.result, gym.result == null, gym.result);
        if (!gym.status) return res.status(500).send({ status: false, error: 'Internal Server Error!.' });
        if (!gym.result || gym.result.length == 0) return res.status(200).send({ status: false, error: 'Gym Not Present!!!' });

        return res.status(200).send(gym);
    } catch (err) { 
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });
    }
}