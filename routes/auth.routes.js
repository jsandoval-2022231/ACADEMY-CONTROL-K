const { Router } = require('express');
const { login } = require('../controller/auth.controller');
const { check } = require('express-validator');
const { validInputs } = require('../middlewares/valid-inputs');

const router = Router();

router.post(
    '/login', 
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        validInputs
    ], login);

module.exports = router;