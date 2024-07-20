const express = require('express');
const router = express();
const auth = require('../middlewares/authMiddleware')
const permissionController = require('../controllers/admin/permissionController');
const categoryController = require('../controllers/admin/categoryController');
const postController = require('../controllers/postController');
const {onlyAdminAccess} = require('../middlewares/adminMiddleware');
const { permissionAddValidator,
        permissionDeleteValidator,
        permissionUpdateValidator,
        categoryValidator,
        categoryDeleteValidator,
        categoryUpdateValidator,
        postValidator,
        postDeleteValidator,
        postUpdateValidator
    } = require('../helpers/adminValidator');

router.post('/add-permission',auth, onlyAdminAccess, permissionAddValidator, permissionController.addPermission);
router.get('/get-permissions',auth, onlyAdminAccess, permissionController.getPermissions);
router.delete('/delete-permission',auth, onlyAdminAccess, permissionDeleteValidator, permissionController.deletePermission);
router.put('/update-permission',auth, onlyAdminAccess, permissionUpdateValidator, permissionController.updatePermission);


router.post('/add-category',auth, onlyAdminAccess, categoryValidator, categoryController.addCategory);
router.get('/get-category',auth, onlyAdminAccess, categoryController.getCategory);
router.delete('/delete-category',auth, onlyAdminAccess, categoryDeleteValidator, categoryController.deleteCategory);
router.put('/update-category',auth, onlyAdminAccess, categoryUpdateValidator, categoryController.updateCategory);


router.post('/create-post',auth, onlyAdminAccess, postValidator, postController.createPost);
router.delete('/delete-post',auth, onlyAdminAccess, postDeleteValidator, postController.deletePost);
router.put('/update-post',auth, onlyAdminAccess, postUpdateValidator, postController.updatePost);

module.exports = router;