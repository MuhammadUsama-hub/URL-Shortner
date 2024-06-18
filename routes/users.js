import express from 'express';
import { handleGetLogin, handleCreateSignUp, handleGetSignUp, handleCheckLogin } from '../controllers/users.js';
const userRouter = express.Router();
userRouter.post('/signup', handleCreateSignUp);
userRouter.post('/login', handleCheckLogin);
userRouter.get('/login', handleGetLogin);
userRouter.get('/signup', handleGetSignUp);
export { userRouter };
