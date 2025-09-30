import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import catalogRouter from "./routes/catalogRouter.ts";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use('/', catalogRouter);

export default app;