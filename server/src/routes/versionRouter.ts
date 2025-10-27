import { Router } from "express";
import { versionGet } from "../controllers/versionController.ts";

const versionRouter = Router();

versionRouter.get("/", versionGet);

export default versionRouter;
