import express from 'express';
import usersController from '../../controllers/usersController.js';
import ROLES_LIST from '../../config/roles_list.js';
import verifyRoles from '../../middleware/verifyRoles.js';

const router = express.Router();

router.get('/', verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers);

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser)
    .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

export default router;