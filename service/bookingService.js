const booking = require('../models/booking')

module.exports.getBookingByClassId = (classId) => {
    return booking.findOne({ classId })
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}

module.exports.Book = (data) => {
    const newBooking = new booking(data)
    return newBooking.save()
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}

module.exports.getBookingById = (userId) => {
    return booking.find({ userId }).populate('classId')
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}

module.exports.getAllBookings = () => {
    return booking.find().populate('userId').populate('classId')
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}