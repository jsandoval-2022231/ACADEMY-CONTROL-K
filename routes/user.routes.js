const { Router } = require('express');
const { check } = require('express-validator');

const { validInputs } = require('../middlewares/valid-inputs');
const { getUser, postUser, getUserById, deleteUser, putUser } = require('../controller/user.controller');

const router = Router();

router.get('/', getUser);

router.post('/', [
    //check('name', 'The name is required').not().isEmpty(),
    //check('email', 'The email is required').isEmail(),
    //check('password', 'The password is required').isLength({ min: 6 }),
    validInputs,
], postUser);

router.get('/:id', [
    check('id', 'The id is not valid').isMongoId(),
    validInputs
],getUserById);


router.delete('/:id', [
    check('id', 'The id is not valid').isMongoId(),
    validInputs
], deleteUser);

router.put(
    '/:id',
    [
        check('id', 'The id is not valid').isMongoId(),
        validInputs
    ],
    putUser
);

module.exports = router;