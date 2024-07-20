const {check} = require('express-validator');

exports.permissionAddValidator = [
    check('permission_name', 'permission is required').not().isEmpty(),
];
exports.permissionDeleteValidator = [
    check('id', 'id is required').not().isEmpty(),
];
exports.permissionUpdateValidator = [
    check('id', 'id is required').not().isEmpty(),
    check('permission_name', 'permission is required').not().isEmpty(),
];
exports.categoryValidator = [
    check('category_name', 'category name is required').not().isEmpty(),
];
exports.categoryDeleteValidator = [
    check('id', 'id is required').not().isEmpty(),
];
exports.categoryUpdateValidator = [
    check('id', 'id is required').not().isEmpty(),
    check('category_name', 'category is required').not().isEmpty(),
];

exports.postValidator = [
    check('title', 'title is required').not().isEmpty(),
    check('description', 'description is required').not().isEmpty(),
];

exports.postDeleteValidator = [
    check('id', 'id is required').not().isEmpty(),
];

exports.postUpdateValidator = [
    check('id', 'id is required').not().isEmpty(),
    check('title', 'title is required').not().isEmpty(),
    check('description', 'description is required').not().isEmpty(),
];


