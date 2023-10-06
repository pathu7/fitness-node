const healthNews = require('../models/healthNews')

module.exports.getNewsByTitle = (title) => {
    return healthNews.findOne({ title })
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}

module.exports.createNews = (data) => {
    const newNews = new healthNews(data)
    return newNews.save()
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}

module.exports.getAllNews = (data) => {
    return healthNews.find().sort({ date: -1 })
        .then(result => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}

module.exports.findNewsById = (id) => {
    return healthNews.findById(id)
        .then((result) => {
            return { status: true, result }
        })
        .catch(err => {
            return { status: false, error: err }
        })
}

module.exports.updateNews = (news_Id, news_data) => {
    return healthNews.findOneAndUpdate({ _id: news_Id }, news_data, { new: true })
        .then((result) => {
            console.log("User Updated")
            return { status: true, result }
        })
        .catch((err) => {
            console.log(err)
            return { status: false, result: err }
        });
} 