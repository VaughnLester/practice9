import { Router } from "express";
import { getProjects, getProjectsByID } from "../controllers/projectController.js";

const router = Router();

router.use("/projects", getProjects)
router.use("/projectsByID", getProjectsByID)

export default router;