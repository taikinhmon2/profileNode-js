const course = require('../models/courses')
const { Obj, multiObj } = require('../../ulti/mongoose.js')
class CourseController {
    show(req, res, next) {
        console.log(req.params);
        course.findOne({ slug: req.params.slug })
            .then((courseDetail) => {
                res.render('courses/course', { courseDetail: Obj(courseDetail) })
            })
            .catch(next)
    }
    createCourse(req, res, next) {
        res.render('courses/create')
    }
    store(req, res, next) {
        if (req.body.name) {
            const createCourse = new course(req.body)
            createCourse.createdAt = new Date()
            createCourse.img = `https://i.ytimg.com/vi/${createCourse.idVideo}/hqdefault.jpg?s…EIYAXABwAEG&rs=AOn4CLD9QFkahguHM2_ISOBWeVW1UwbaMw`
            createCourse.save()
                .then(() => res.redirect(`/course/${createCourse.slug}`))
                .catch(next)
        }
    }
    trash(req, res, next) {
        course.findDeleted({})
            .then((course) => {
                res.render('courses/trashCourse', { courses: multiObj(course) })
            })
    }
    restore(req, res, next) {
        course.restore({ _id: req.params.id })
            .then(() => {
                res.redirect('/my/courses')
            })
    }
    viewUpdate(req, res, next) {
        course.findOne({ _id: req.params.id })
            .then((viewUpdate) => {
                res.render('courses/viewUpdate', { viewUpdate: Obj(viewUpdate) })
            })
    }
    edited(req, res, next) {
        course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/my/courses'))
    }
    deleteCourse(req, res, next) {
        course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
    }
    deleteForce(req, res, next) {
        course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
    }
    handleCheckItems(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                course.delete({ _id: { $in: req.body.courseId } })
                    .then(() => { res.redirect('back') })
                break;

            default:
                res.json({ message: 'action not valid' })
                break;
        }
    }

    handleCheckItemsInTrash(req, res, next) {
        switch (req.body.action) {
            case 'restore':
                course.restore({ _id: { $in: req.body.courseId } })
                    .then(() => res.redirect('/my/courses'))
                break
            case 'delete':
                course.deleteMany({ _id: { $in: req.body.courseId } })
                    .then(() => res.redirect('back'))
                break

            default:
                res.json({ message: 'Action is Invalid' })
        }
    }
}

module.exports = new CourseController