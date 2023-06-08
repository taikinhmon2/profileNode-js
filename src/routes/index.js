const newRouter = require('./News')
const SiteRouter = require('./Site')
const CourseRouter = require('./Course')
const myCourseRouter = require('./myCourse')
function route(app) {
    app.use('/course',CourseRouter)
    app.use('/news', newRouter)
    app.use('/my',myCourseRouter)
    app.use('/',SiteRouter)
}  

module.exports = route