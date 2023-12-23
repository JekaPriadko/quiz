import express, { Router } from 'express';

import { authValidator } from '../validators';
import { authCheck } from '../middlewares';

import * as controller from '../controllers/auth.controller';

const router: Router = express.Router();

/**
 * @method - POST
 * @param {string} path - /api/v1/auth/signup
 * @description - User Signup
 */

router.post(
  '/signup',
  [authValidator.validationSignUp, authValidator.checkDuplicateUsernameOrEmail],
  controller.signup,
);

/**
 * @method - POST
 * @param {string} path - /api/v1/auth/signin
 * @description - User Login
 */
router.post('/signin', [authValidator.validationSignIn], controller.signin);

/**
 * @method - GET
 * @param {string} path - /api/v1/auth/refresh
 * @description - Refresh Access Token
 */
router.get('/refresh', controller.refreshAccessToken);

/**
 * @method - GET
 * @param {string} path - /api/v1/auth/logout
 * @description - User Logout
 */
router.get('/logout', [authCheck.verifyToken], controller.logout);

export default router;
