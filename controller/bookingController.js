const bookingService = require('../service/bookingService')

module.exports.BookClass = async (req, res, next) => {
    try {
        let BookedClass = await bookingService.getBookingByClassId(req.body.classId)

        if (BookedClass.result) {
            return res.status(200).send({
                status: false,
                message: 'Booking exists'
            })
        } else {
            const userId = req.userData._id
            let data = { ...req.body, userId }
            console.log('data', data);
            let BookClass = await bookingService.Book(data)
            if (BookClass.status) {
                return res.status(200).send({
                    message: 'Class booked',
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

module.exports.getMyBookings = async (req, res, next) => {
    try {
        const id = req.userData._id
        let getMyBookings = await bookingService.getBookingById(id)

        if (!getMyBookings.status) return res.status(500).send({ status: false, error: getMyBookings.error ? getMyBookings.error : 'Internal Server Error!.' });
        if (!getMyBookings.result || getMyBookings.result.length == 0) return res.status(200).send({ status: false, error: 'No Booking!!!' });

        Promise.all(getMyBookings.result?.map((bookings) => {
            let book = bookings.toObject()
            // console.log('jksdjskf', book);
            delete book['userId']
            // console.log('book', book);
            return book;
        })).then((myBook_res) => {
            console.log(myBook_res);
            return res.status(200).send({ status: true, result: myBook_res });
        })
        // getMyBookings.result?.forEach((bookings) => {
        //     let book = bookings.toObject()
        //     delete book['userId']
        //     console.log('book',book);
        //     return book;
        // })

        // console.log('get', getMyBookings);

        // return res.status(200).send(getMyBookings);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });
    }
}

module.exports.getAllBookings = async (req, res, next) => {
    try {
        let getBookings = await bookingService.getAllBookings()

        if (!getBookings.status) return res.status(500).send({ status: false, error: 'Internal Server Error!.' });
        if (!getBookings.result || getBookings.result.length == 0) return res.status(200).send({ status: false, error: 'Booking Not Present!!!' });

        return res.status(200).send(getBookings);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });
    }
}