import { Router } from "express";
import { skinAllGet, skinIDGet } from "../controllers/skinController.ts";
const skinRouter = Router();

skinRouter.get("/", skinAllGet);
skinRouter.get("/:skinID", skinIDGet);

export default skinRouter;
