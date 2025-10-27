import dotenv from "dotenv";
import skinJSON from "./scrapeSkinInfo.ts";
import { Client } from "pg";
import fs from "fs";

dotenv.config();

//assets github.com/CommunityDragon/Docs/blob/master/assets.md
//cdn endpoints (tileUrl) https://cdn.communitydragon.org/endpoints

const createTableSQL = `
CREATE TABLE IF NOT EXISTS skins (
  skin_id INT PRIMARY KEY,
  id INT,
  name TEXT,
  champion_name TEXT,
  wiki_name TEXT,
  rarity TEXT,
  skin_line TEXT,
  splash_url TEXT,
  tile_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp(0)
  );`;

//bandage solution bcz relation already exists if not inlcude the if not exist
const createTempTableSQL = `CREATE TEMPORARY TABLE IF NOT EXISTS skins_new (
  skin_id INT PRIMARY KEY,
  id INT,
  name TEXT,
  champion_name TEXT,
  wiki_name TEXT,
  rarity TEXT,
  skin_line TEXT,
  splash_url TEXT,
  tile_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp(0)
);`;

const insertTableSQL = `INSERT INTO skins_new
SELECT *
FROM json_to_recordset($1) AS x(skin_id INT, id INT, name TEXT, champion_name TEXT, wiki_name TEXT, rarity TEXT, skin_line TEXT, splash_url TEXT, tile_url TEXT); 
  `;

const mergeSQL = `
MERGE INTO skins sk
USING skins_new skn
ON sk.skin_id = skn.skin_id
WHEN MATCHED THEN
  UPDATE SET splash_url = skn.splash_url, tile_url = skn.tile_url, updated_at = default
WHEN NOT MATCHED THEN
  INSERT (
  skin_id,
    id,
    name,
    champion_name,
    wiki_name,
    rarity,
    skin_line,
    splash_url,
    tile_url,
    updated_at
  )
  VALUES (
  skn.skin_id,
    skn.id,
    skn.name,
    skn.champion_name,
    skn.wiki_name,
    skn.rarity,
    skn.skin_line,
    skn.splash_url,
    skn.tile_url,
    skn.updated_at
  )
RETURNING
  merge_action() as action,
  sk.*;`;

//dropping bcz temp table not disappearing (maybe its a time issue when running populate back to back)
const dropSQL = `
  DROP table skins_new
;`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB_CONNECTION_STRING,
  });
  await client.connect();
  await client.query(createTableSQL);
  await client.query(createTempTableSQL);
  await client.query(insertTableSQL, [skinJSON]);

  const res = await client.query(mergeSQL);
  try {
    fs.writeFileSync(
      "./src/models/skinModel/skinDifferences.txt",
      JSON.stringify(res, null, 4),
    );
    console.log("logged");
  } catch (err) {
    console.error(err);
  }

  await client.query(dropSQL);
  await client.end();
  console.log("done");
}

main();
