import express from 'express';
import {
  RegisterUser,
  verifyBuyer,
  buyerLogin,
  googleAuth,
  updateUserProfile,
  resendBuyerVerificionLink,
  forgotPassword,
  resetPassword,
} from '../controllers/User.controller';

import validate from '../middlewares/validateResource';

import { Authenticate } from '../middlewares';
import { UserRegisterInputSchema } from '../dto/User.dto';
import { userLoginInputSchema } from '../dto/User.dto';

const router = express.Router();


router.post('/register', validate(UserRegisterInputSchema), RegisterUser);
router.get('/confirm/:confirmationCode', verifyBuyer);
router.post('/resend-confirm', resendBuyerVerificionLink);
router.post('/login', validate(userLoginInputSchema), buyerLogin);
router.post('/google', googleAuth);
router.put('/update', Authenticate, updateUserProfile)
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:id/:token', resetPassword);

export default router;