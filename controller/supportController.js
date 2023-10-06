const supportService = require('../service/supportService')

module.exports.createFaqs = async (req,res,next) =>{
    try {
        let CreateFaqs = await supportService.createFaqs(req.body)
        if (CreateFaqs.status) {
            return res.status(200).send({
                message: 'Faq created',
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

module.exports.getAllFaqs = async (req, res, next) => {
    try {
        let getFaqs = await supportService.getAllFaqs()

        if (!getFaqs.status) return res.status(500).send({ status: false, error: 'Internal Server Error!.' });
        if (!getFaqs.result || getFaqs.result.length == 0) return res.status(200).send({ status: false, error: 'Faqs Not Present!!!' });

        return res.status(200).send(getFaqs);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });
    }
}

module.exports.createContactSupport = async (req,res,next) =>{
    try {
        let CreateContactSupport = await supportService.createContactSupport(req.body)
        if (CreateContactSupport.status) {
            return res.status(200).send({
                message: 'Contact Support created',
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

module.exports.getAllContactSupport = async (req, res, next) => {
    try {
        let getContactSupport = await supportService.getAllContactSupport()

        if (!getContactSupport.status) return res.status(500).send({ status: false, error: 'Internal Server Error!.' });
        if (!getContactSupport.result || getContactSupport.result.length == 0) return res.status(200).send({ status: false, error: 'Contact Support Not Present!!!' });

        return res.status(200).send(getContactSupport);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });
    }
}
