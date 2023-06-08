const { format } = require("date-fns");

module.exports = {
    multiObj: (course) => {
        console.log('đã chạy');
        return course.map((courses) => {
            if (courses.createdAt) {
               courses.createdAt = format(new Date(courses.createdAt), 'yyyy-MM-dd(HH:mm:ss)')
            }
            return courses.toObject()
        })
    },
    Obj: (course) => {
        return course ? course.toObject() : course
    }
}