const router = require('express').Router();
const userController = require('../controller/users');

/**
 * get user by id or email
 */

router.get('/:userId', userController.getUserById);

/**
 * update user by id
 */
router.put('/:userId', userController.putUserById)

/**
 * update user by id
 */
router.patch('/:userId', userController.patchUserById); 

/**
 * delete user by id
 */
router.delete('/:userId', userController.deleteUserById);

/**
 * get all users
 */
router.get('/', userController.getUsers);
/**
 * create new user
 */
router.post('/', userController.postUser);


module.exports = router;