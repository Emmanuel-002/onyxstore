import express from 'express';
import { deleteUser, test, updateUser, getUsers, getUser, verifyUser, deleteAccount} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteAccount)
router.delete('/admin/user/delete/:id', verifyToken, deleteUser)
router.get('/users', verifyToken, getUsers)
router.post('/verify/:id', verifyToken, verifyUser)
router.get('/:id', verifyToken, getUser)

export default router;