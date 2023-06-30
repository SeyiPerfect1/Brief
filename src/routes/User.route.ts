import express from 'express';
import {
  RegisterUser,
  verifyUser,
  userLogin,
  googleAuth,
  updateUserProfile,
  resendUserVerificionLink,
  forgotPassword,
  resetPassword,
} from '../controllers/User.controller';

import validate from '../middlewares/validateResource';

import { Authenticate } from '../middlewares';
import { UserRegisterInputSchema } from '../dto/User.dto';
import { userLoginInputSchema } from '../dto/User.dto';

const router = express.Router();


router.post('/register', validate(UserRegisterInputSchema), RegisterUser);
router.get('/confirm/:confirmationCode', verifyUser);
router.post('/resend-confirm', resendUserVerificionLink);
router.post('/login', validate(userLoginInputSchema), userLogin);
router.post('/google', googleAuth);
router.put('/update', Authenticate, updateUserProfile)
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:id/:token', resetPassword);

export default router;