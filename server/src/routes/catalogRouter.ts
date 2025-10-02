import { Router } from "express";
import {
  catalogGet,
  catalogPost,
  catalogPut,
  catalogDelete,
} from "../controllers/catalogController.ts";

const catalogRouter = Router();

catalogRouter.get("/", catalogGet);
catalogRouter.post("/", catalogPost);
catalogRouter.put("/", catalogPut);
catalogRouter.delete("/", catalogDelete);

export default catalogRouter;
