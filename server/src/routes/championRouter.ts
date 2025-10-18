import { Router } from "express";
import {
  championAllGet,
  championIDGet,
} from "../controllers/championController.ts";

const championRouter = Router();

championRouter.get("/", championAllGet);
championRouter.get("/:championID", championIDGet);

export default championRouter;
