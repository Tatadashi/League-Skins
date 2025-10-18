import { Router } from "express";
import {
  skinAllGet,
  skinIDGet,
  skinPost,
  skinPut,
  skinDelete,
} from "../controllers/skinController.ts";

const skinRouter = Router();

skinRouter.get("/", skinAllGet);
skinRouter.get("/:skinID", skinIDGet);
skinRouter.post("/", skinPost);
skinRouter.put("/", skinPut);
skinRouter.delete("/", skinDelete);

export default skinRouter;
