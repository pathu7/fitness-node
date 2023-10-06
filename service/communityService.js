const community = require('../models/community')

module.exports.createCommunity = (data) => {
    const newCommunity = new community(data)
    return newCommunity.save()
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}

module.exports.getCommunities = () => {
    return community.find()
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}