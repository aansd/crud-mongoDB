const {check} = require('express-validator');

exports.registerValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'email is required').isEmail().normalizeEmail({
        gmail_remove_dots:true
    }),
    check('password', 'Password is required').not().isEmpty(),
];
exports.loginValidator = [
    check('email', 'email is required').isEmail().normalizeEmail({
        gmail_remove_dots:true
    }),
    check('password', 'Password is required').not().isEmpty(),
];

