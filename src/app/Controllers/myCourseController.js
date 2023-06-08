const course = require('../models/courses')
const { multiObj } = require('../../ulti/mongoose.js')
class myCourseController {
    show(req, res, next) {
        let getCourses = course.find({})
        if (req.query.hasOwnProperty('_sort')) {
           getCourses = getCourses.sort({
                [req.query.colum]: req.query.type
            })
        }
        Promise.all([getCourses, course.countDocumentsDeleted()])
            .then(([courses, countCourses]) => {
                const myCourses = multiObj(courses)
                res.render('courses/myCourse', { myCourses: myCourses, countCourses })
            })
    }
}

module.exports = new myCourseController