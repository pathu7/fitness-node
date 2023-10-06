const classService = require('../service/classService')

module.exports.createClass = async (req, res, next) => {
    try {
        // let data = req.body
        // if (req.file) {
        //     const file = req.file.path
        //     data = { ...data, communityImage: file }
        // }
        // console.log('data',data);
        let CreateClass = await classService.createClass(req.body)
        if (CreateClass.status) {
            return res.status(200).send({
                message: 'Class created',
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

module.exports.getAllClasses = async (req, res, next) => {
    try {
        let getClasses = await classService.getClasses()

        if (!getClasses.status) return res.status(500).send({ status: false, error: 'Internal Server Error!.' });
        if (!getClasses.result || getClasses.result.length == 0) return res.status(200).send({ status: false, error: 'Class Not Present!!!' });

        return res.status(200).send(getClasses);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });
    }
}