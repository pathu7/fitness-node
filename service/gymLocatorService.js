const gymLocator = require('../models/gymLocator')

module.exports.createGym = (data) => {
    const newGymLocator = new gymLocator(data)
    return newGymLocator.save()
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}

module.exports.findGymByLocation = (location) => {
    return gymLocator.find({ location: { $regex: location, $options: 'i' } })
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}

module.exports.findGymById = (id) => {
    return gymLocator.findById(id)
        .then((result) => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}