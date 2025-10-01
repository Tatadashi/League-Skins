import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { Pool } = pg;
export const skinsPool = new Pool({
    connectionString: process.env.DB_CONNECTION_STRING,
});

//validation part if needed