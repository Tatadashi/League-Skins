import { Router } from "express";
import { catalogGet } from "../controllers/catalogController.js";
const catalogRouter = Router();
catalogRouter.get('/', catalogGet);
export default catalogRouter;
//# sourceMappingURL=catalogRouter.js.map