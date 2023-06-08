const express = require('express')
const router = express.Router()
const myCourseController = require('../app/Controllers/myCourseController')
router.get('/courses', myCourseController.show)
module.exports = router