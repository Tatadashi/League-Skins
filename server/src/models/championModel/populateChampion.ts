import dotenv from "dotenv";
import championJSON from "./scrapeChampionInfo.ts";
import { Client } from "pg";

dotenv.config();

//enable RLS and bypass it with db roles
//assets github.com/CommunityDragon/Docs/blob/master/assets.md
//cdn endpoints (tileUrl) https://cdn.communitydragon.org/endpoints

//does not work to update (releaseDate != date)
const createTableSQL = `
CREATE TABLE IF NOT EXISTS champions (
  id INT PRIMARY KEY,
  name TEXT,
  description TEXT,
  alias TEXT,
  square_url TEXT,
  splash_url TEXT,
  tile_url TEXT,
  release_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp(0)
  );`;

const insertTableSQL = `INSERT INTO champions
SELECT *
FROM json_to_recordset($1) AS x(id INT, name TEXT, description TEXT, alias TEXT, square_url TEXT, splash_url TEXT, tile_url TEXT, release_date DATE); 
  `;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB_CONNECTION_STRING,
  });
  await client.connect();
  await client.query(createTableSQL);
  await client.query(insertTableSQL, [championJSON]);
  await client.end();
  console.log("done");
}

main();
