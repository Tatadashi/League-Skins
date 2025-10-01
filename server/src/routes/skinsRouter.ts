import { Router } from "express";
import { skinsGet, skinsIDGet, skinsPost, skinsPut, skinsDelete } from "../controllers/skinsController.ts";

const skinsRouter = Router();

skinsRouter.get('/', skinsGet);
skinsRouter.get('/:skinID', skinsIDGet);
skinsRouter.post("/", skinsPost);
skinsRouter.put("/", skinsPut);
skinsRouter.delete("/", skinsDelete);

export default skinsRouter;