import express from "express";
import type { Request } from "express";
import cors, { type CorsOptions } from "cors";
import catalogRouter from "./routes/catalogRouter.ts";
import skinsRouter from "./routes/skinsRouter.ts";

const app = express();

app.options("/skins/:skinId", cors());

const dynamicCorsOptions = function (
  req: Request,
  callback: (error: null | Error, corsOption: CorsOptions) => void,
) {
  let corsOptions;
  if (req.path.startsWith("/auth/connect/")) {
    //change to frontend website link
    corsOptions = {
      origin: "http://localhost:6543",
      credentials: true,
    };
  } else {
    //not exactly sure how this affects preflight
    corsOptions = { origin: "*" };
  }
  callback(null, corsOptions);
};

app.use(cors(dynamicCorsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", catalogRouter);
app.use("/skins", skinsRouter);

export default app;
