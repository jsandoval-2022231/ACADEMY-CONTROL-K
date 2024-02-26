const { Router } = require('express');
const { check } = require('express-validator');
const { validInputs } = require('../middlewares/valid-inputs');
const { getCourse, postCourse } = require('../controller/course.controller');
const { isTeacher } = require('../helpers/course-validators');

const router = Router();

router.get('/', getCourse);

router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    check('teacher', 'The teacher is required').custom(isTeacher),
    validInputs
], postCourse);


module.exports = router;