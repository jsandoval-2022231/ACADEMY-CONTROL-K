const { Router } = require('express');
const { check } = require('express-validator');
const { getStudent, postCourse } = require('../controller/student.controller');

const router = Router();

router.get('/', getStudent);

router.post('/', [
    check('user', 'The user is required').not().isEmpty(),
    check('courses', 'The courses are required').not().isEmpty(),
], postCourse);


module.exports = router;