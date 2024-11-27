import express from "express";
const router = express.Router();
import authMiddleware from "../middlewares/auth.middleware";
import { userController } from "../controllers/user.controller";


router.get('/:userId',userController.getById);

router.post('/login', userController.login);

module.exports = router;
