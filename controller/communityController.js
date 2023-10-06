const communityService = require('../service/communityService')

module.exports.createCommunity = async (req, res, next) => {
    try {
        let data = req.body
        if (req.file) {
            const file = req.file.path
            data = { ...data, communityImage: file }
        }
        console.log('data',data);
        let CreateCommunity = await communityService.createCommunity(data)
        if (CreateCommunity.status) {
            return res.status(200).send({
                message: 'Community created',
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

module.exports.getAllCommunity = async (req, res, next) => {
    try {
        let getCommunities = await communityService.getCommunities()

        if (!getCommunities.status) return res.status(500).send({ status: false, error: 'Internal Server Error!.' });
        if (!getCommunities.result || getCommunities.result.length == 0) return res.status(200).send({ status: false, error: 'Community Not Present!!!' });

        return res.status(200).send(getCommunities);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });
    }
}