import app from './app.ts';
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`now listening on ${PORT}`)
});
