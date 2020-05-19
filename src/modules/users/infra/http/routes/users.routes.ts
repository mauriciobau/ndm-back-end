import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersControllers from '../controllers/UsersControllers';
import UsersAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersControllers = new UsersControllers();
const usersAvatarController = new UsersAvatarController();
const upload = multer(uploadConfig);

usersRouter.post('/', usersControllers.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
