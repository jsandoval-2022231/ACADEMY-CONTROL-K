const { Router } = require('express');
const { check } = require('express-validator');
const { getStudent, postCourse, getCoursesByStudent } = require('../controller/student.controller');
const { limitCourses} = require('../helpers/course-validators');
const { validInputs } = require('../middlewares/valid-inputs');

const router = Router();

router.get('/', getStudent);

router.post('/', [
    check('courses', 'The courses are required').not().isEmpty(),
    validInputs,
], postCourse);


router.get('/courses', getCoursesByStudent);
module.exports = router;