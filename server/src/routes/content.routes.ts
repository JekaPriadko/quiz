import express, { Router } from 'express';

import { authCheck, roleCheck } from '../middlewares';
import * as controller from '../controllers/test.controller';

const router: Router = express.Router();

/**
 * @method - GET
 * @param {string} path - /api/v1/test/all
 * @description - Open router for content
 */
router.get('/all', controller.allAccess);

/**
 * @method - GET
 * @param {string} path - /api/v1/test/user
 * @description - Router only for auth user
 */
router.get('/user', [authCheck.verifyToken], controller.userBoard);

/**
 * @method - GET
 * @param {string} path - /api/v1/test/user
 * @description - Router only for admin
 */
router.get(
  '/admin',
  [authCheck.verifyToken, roleCheck.isAdmin],
  controller.adminBoard,
);

export default router;
