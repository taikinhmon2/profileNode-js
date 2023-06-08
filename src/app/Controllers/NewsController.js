class NewsController {
    index(red, res) {
        res.render('news')
    }

    show(red,res) {
        res.send('tôi không yêu anh ấy')
    }
}

module.exports = new NewsController