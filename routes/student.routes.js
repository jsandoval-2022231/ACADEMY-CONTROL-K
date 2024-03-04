const { Router } = require('express');
const { check } = require('express-validator');
const { getStudent, postCourse, getCoursesByStudent } = require('../controller/student.controller');
const { limitCourses, existCourse, existStudent } = require('../helpers/course-validators');
const { validInputs } = require('../middlewares/valid-inputs');

const router = Router();

router.get('/', getStudent);

router.post('/', [
    check('courses', 'The courses are required').not().isEmpty(),
    check('courses').custom(existCourse),
    //check('courses', 'You only can add 3 courses').custom(limitCourses),
    validInputs,
], postCourse);


router.get('/courses', getCoursesByStudent);
module.exports = router;