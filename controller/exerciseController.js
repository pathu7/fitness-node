const exerciseService = require('../service/exerciseService')
// const url = require('url')
// const querystring = require('querystring')

module.exports.createExercise = async (req, res, next) => {
    try {
        console.log('file', req.files, 'req.body', req.body);
        let exercise = await exerciseService.getExerciseByName(req.body.name)

        if (exercise.result) {
            return res.status(200).send({
                status: false,
                message: 'Exercise exists'
            })
        } else {

            let data = req.body
            let muscles = []
            data.musclesTargeted.map((item) => {
                let data = JSON.parse(item)
                muscles.push(data)
            })
            data.musclesTargeted = muscles
            if (req.files) {
                if (req.files.exerciseImage) {
                    const image = req.files.exerciseImage[0].path
                    data = { ...data, exerciseImage: image }
                    console.log('image');
                }
                if (req.files.exerciseVideo) {
                    const video = req.files.exerciseVideo[0].path
                    data = { ...data, exerciseVideo: video }
                    console.log('video');
                }
            }
            console.log('data', data);

            let CreateExercise = await exerciseService.createExercise(data)
            if (CreateExercise.status) {
                return res.status(200).send({
                    message: 'Exercise created',
                    status: true,
                    result: CreateExercise.result
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

module.exports.getAllExercise = async (req, res, next) => {
    try {
        let getExercises = await exerciseService.getAllExercise()

        if (!getExercises.status) return res.status(500).send({ status: false, error: 'Internal Server Error!.' });
        if (!getExercises.result) return res.status(200).send({ status: false, error: 'Exercise Not Present!!!' });

        return res.status(200).send(getExercises);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });
    }
}

module.exports.getExerciseById = async (req, res, next) => {
    try {
        // console.log(req.body._id);
        // const id = req.body._id

        // const parsedUrl = url.parse(req.url)
        // const query = querystring.parse(parsedUrl.query)
        const id = req.query._id

        // console.log('parsedUrl',parsedUrl,"query",query);
        // console.log("_parsedUrl",req._parsedUrl,"query:",req.query);

        let exercise = await exerciseService.findExerciseById(id)
        // console.log(exercise);
        if (!exercise.status) return res.status(500).send({ status: false, error: 'Internal Server Error!.' });
        if (!exercise.result) return res.status(200).send({ status: false, error: 'Exercise Not Present!!!' });

        exercise.result = exercise.result.toObject();
        // delete exercise.result['exerciseImage'];
        // delete exercise.result['exerciseVideo'];

        return res.status(200).send(exercise);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });
    }
}

module.exports.updateExercise = async (req, res, next) => {
    try {
        // console.log(req.userData);
        // console.log(req.body);
        // console.log(req.file);

        let exercise = await exerciseService.getExerciseByName(req.body.name)

        // console.log(exercise, req.body);

        if (exercise.result && req.body._id != exercise.result._id) {
            return res.status(200).send({
                status: false,
                message: 'Exercise exists'
            })
        }

        const id = req.body._id
        let data = req.body
        let muscles = []
        data.musclesTargeted.map((item) => {
            let data = JSON.parse(item)
            muscles.push(data)
        })
        data.musclesTargeted = muscles
        if (req.files) {
            if (req.files.exerciseImage) {
                const image = req.files.exerciseImage[0].path
                data = { ...data, exerciseImage: image }
                console.log('image');
            }
            if (req.files.exerciseVideo) {
                const video = req.files.exerciseVideo[0].path
                data = { ...data, exerciseVideo: video }
                console.log('video');
            }
        }
        console.log('data', data);
        delete data._id

        // console.log('data ', data, id);

        let exerciseUpdate = await exerciseService.updateExercise(id, data)
        if (!exerciseUpdate.status) return res.status(500).send(exerciseUpdate)

        return res.status(200).send(exerciseUpdate);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });
    }
}