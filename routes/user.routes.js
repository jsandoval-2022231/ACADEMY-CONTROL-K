const { Router } = require('express');
const { check } = require('express-validator');

const { validInputs } = require('../middlewares/valid-inputs');
const { getUser, postUser, getUserById, deleteUser, putUser } = require('../controller/user.controller');
const { validJWT } = require('../middlewares/valid-jwt');
const { isAuthRole } = require('../middlewares/valid-role');
const { isValidRole, emailExists, isOwner } = require('../helpers/db-validators');

const router = Router();

router.get('/', getUser);

router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    check('email').custom(emailExists),
    check('password', 'The password is required').isLength({ min: 6 }),
    check('role').custom(isValidRole),
    validInputs,
], postUser);

router.get('/:id', [
    check('id', 'The id is not valid').isMongoId(),
    validInputs
],getUserById);


router.delete('/:id', [
    validJWT,
    check('id','You are not allowed to delete this user').custom(isOwner),
    check('id', 'The id is not valid').isMongoId(),
    validInputs
], deleteUser);

router.put(
    '/:id',
    [
        validJWT,
        check('id', 'The id is not valid').isMongoId(),
        check('id', 'You are not allowed to modified this user').custom(isOwner),
        validInputs
    ],
    putUser
);

module.exports = router;