const healthNewsService = require('../service/healthNewsService')

module.exports.createNews = async (req,res,next) =>{
    try {
        let CreateNews = await healthNewsService.createNews(req.body)
        if (CreateNews.status) {
            return res.status(200).send({
                message: 'Gym created',
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

module.exports.getAllNews = async (req, res, next) => {
    try {
        let getNews = await healthNewsService.getAllNews()

        if (!getNews.status) return res.status(500).send({ status: false, error: 'Internal Server Error!.' });
        if (!getNews.result || getNews.result.length == 0) return res.status(200).send({ status: false, error: 'News Not Present!!!' });

        return res.status(200).send(getNews);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });
    }
}

module.exports.getNewsById = async (req, res, next) => {
    try {
        const id = req.params.id
        // console.log(id,req.params);

        // console.log('parsedUrl',parsedUrl,"query",query);
        // console.log("_parsedUrl",req._parsedUrl,"query:",req.query);

        let News = await healthNewsService.findNewsById(id)
        // console.log(News);
        if (!News.status) return res.status(500).send({ status: false, error: 'Internal Server Error!.' });
        if (!News.result) return res.status(200).send({ status: false, error: 'News Not Present!!!' });

        return res.status(200).send(News);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });
    }
}

module.exports.updateNews = async (req, res, next) => {
    try {
        // console.log(req.userData);
        // console.log(req.body);
        // console.log(req.file);

        let news = await healthNewsService.getNewsByTitle(req.body.title)

        // console.log(meal, req.body);

        if (news.result && req.body._id != news.result._id) {
            return res.status(200).send({
                status: false,
                message: 'News exists'
            })
        }

        const id = req.body._id
        let data = req.body
        delete data._id

        // console.log('data ', data, id);

        let newsUpdate = await healthNewsService.updateNews(id,data)
        if (!newsUpdate.status) return res.status(500).send(newsUpdate)

        return res.status(200).send(newsUpdate);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, error: err ? err : 'Internal Server Error!' });
    }
}