import { Router } from "express";
import { catalogGet } from "../controllers/catalogController.ts";

const catalogRouter = Router();

catalogRouter.get('/', catalogGet);

export default catalogRouter;