const FAQs = require('../models/faq')
const contactSupport = require('../models/contactSupport')

module.exports.createFaqs = (data) => {
    const newFaqs = new FAQs(data)
    return newFaqs.save()
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}

module.exports.getAllFaqs = (data) => {
    return FAQs.find()
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}

module.exports.createContactSupport = (data) => {
    const newContactSupport = new contactSupport(data)
    return newContactSupport.save()
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}

module.exports.getAllContactSupport = (data) => {
    return contactSupport.find()
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}