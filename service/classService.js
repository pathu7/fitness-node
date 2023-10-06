const classes = require('../models/class')

module.exports.createClass = (data) => {
    const newClass = new classes(data)
    return newClass.save()
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}

module.exports.getClasses = () => {
    return classes.find()
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}