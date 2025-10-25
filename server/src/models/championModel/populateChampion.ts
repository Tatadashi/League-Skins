import dotenv from "dotenv";
import championJSON from "./scrapeChampionInfo.ts";
import { Client } from "pg";
import fs from "fs";

dotenv.config();

//enable RLS and bypass it with db roles (it works!?), pgdump backup instead of manual
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
  release_date TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp(0)
  );`;

//bandage solution bcz relation already exists if not inlcude the if not exist
const createTempTableSQL = `CREATE TEMPORARY TABLE IF NOT EXISTS champions_new (
  id INT PRIMARY KEY,
  name TEXT,
  description TEXT,
  alias TEXT,
  square_url TEXT,
  splash_url TEXT,
  tile_url TEXT,
  release_date TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp(0)
);`;

const insertTableSQL = `INSERT INTO champions_new
SELECT *
FROM json_to_recordset($1) AS x(id INT, name TEXT, description TEXT, alias TEXT, square_url TEXT, splash_url TEXT, tile_url TEXT, release_date TEXT); 
  `;

//insert part kinda untested
const mergeSQL = `
MERGE INTO champions ch
USING champions_new chn
ON ch.id = chn.id
WHEN MATCHED THEN
  UPDATE SET square_url = chn.square_url, splash_url = chn.splash_url, tile_url = chn.tile_url, updated_at = default
WHEN NOT MATCHED THEN
  INSERT (
    id,
    name,
    description,
    alias,
    square_url,
    splash_url,
    tile_url,
    release_date,
    updated_at
  )
  VALUES (
    chn.id,
    chn.name,
    chn.description,
    chn.alias,
    chn.square_url,
    chn.splash_url,
    chn.tile_url,
    chn.release_date,
    chn.updated_at
  )
RETURNING
  merge_action() as action,
  ch.*;`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB_CONNECTION_STRING,
  });
  await client.connect();
  await client.query(createTableSQL);
  await client.query(createTempTableSQL);
  await client.query(insertTableSQL, [championJSON]);

  const res = await client.query(mergeSQL);
  try {
    fs.writeFileSync(
      "./src/models/championModel/championDifferences.txt",
      JSON.stringify(res, null, 4),
    );
    console.log("logged");
  } catch (err) {
    console.error(err);
  }
  await client.end();
  console.log("done");
}

main();
