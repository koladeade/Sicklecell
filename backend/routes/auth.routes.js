import express from 'express';
import  {login, logout, signup} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login); // Assuming login uses the same controller for now
router.get('/logout', logout)

export default router;
