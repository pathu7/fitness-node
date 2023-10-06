const workoutPlanService = require('../service/workoutPlanService')

module.exports.createWorkoutPlan = async (req, res, next) => {
    try {
        console.log(req.body);
        let plan = await workoutPlanService.getPlanByName(req.body.name)

        if (plan.result) {
            return res.status(200).send({
                status: false,
                message: 'Plan exists'
            })
        } else {

            let CreatePlan = await workoutPlanService.createWorkoutPlan(req.body)
            if (CreatePlan.status) {
                return res.status(200).send({
                    message: 'Plan created',
                    status: true
                })
            } else {
                res.status(500).send({ status: false, error: err })
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });
    }
}

module.exports.getAllWorkoutPlans = async (req, res, next) => {
    try {
        let getPlans = await workoutPlanService.getWorkoutPlan()

        if (!getPlans.status) return res.status(500).send({ status: false, error: 'Internal Server Error!.' });
        if (!getPlans.result || getPlans.result.length == 0) return res.status(200).send({ status: false, error: 'Plans Not Present!!!' });

        return res.status(200).send(getPlans);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });
    }
}

module.exports.getWorkoutPlansById = async (req, res, next) => {
    try {
        const id = req.params.id
        // console.log(id,req.params);

        // console.log('parsedUrl',parsedUrl,"query",query);
        // console.log("_parsedUrl",req._parsedUrl,"query:",req.query);

        let plan = await workoutPlanService.findWorkoutPlanById(id)
        // console.log(News);
        if (!plan.status) return res.status(500).send({ status: false, error: 'Internal Server Error!.' });
        if (!plan.result) return res.status(200).send({ status: false, error: 'Plan Not Present!!!' });

        return res.status(200).send(plan);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });
    }
}

module.exports.updateWorkoutPlan = async (req, res, next) => {
    try {
        // console.log(req.userData);
        // console.log(req.body);
        // console.log(req.file);

        let plan = await workoutPlanService.getPlanByName(req.body.name)

        // console.log(plan, req.body);

        if (plan.result && req.body._id != plan.result._id) {
            return res.status(200).send({
                status: false,
                message: 'Plan exists'
            })
        }

        const id = req.body._id
        let data = req.body
        delete data._id

        // console.log('data ', data, id);

        let planUpdate = await workoutPlanService.updatePlan(id,data)
        if (!planUpdate.status) return res.status(500).send(planUpdate)

        return res.status(200).send(planUpdate);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });
    }
}