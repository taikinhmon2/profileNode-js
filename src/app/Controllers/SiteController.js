const course = require('../models/courses')
const {multiObj} = require('../../ulti/mongoose.js')
class SiteController {
    index(red, res) {
        course.find()
            .then((course) => {
                res.render('home', { course: multiObj(course) })
            })
            .catch(() => {
                res.status(500).json({ error: 'message' })
            })
    }

    search(red, res) {
        res.render('search')
    }
}

module.exports = new SiteController