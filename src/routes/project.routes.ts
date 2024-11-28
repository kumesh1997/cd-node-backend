import express from "express";
const router = express.Router();
import authMiddleware from "../middlewares/auth.middleware";
import { projectController } from "../controllers/project.controller";


router.get('/paginated', authMiddleware, projectController.getPaginatedProjects);

module.exports = router;
