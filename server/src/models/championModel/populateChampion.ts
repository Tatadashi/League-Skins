import dotenv from "dotenv";
import championJSON from "./scrapeChampionInfo.ts";
import { Client } from "pg";

dotenv.config();

const createTableSQL = `
CREATE TABLE IF NOT EXISTS champions (
  id INT PRIMARY KEY,
  name TEXT,
  alias TEXT,
  square_url TEXT,
  release_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp(0)
  );`;

const insertTableSQL = `INSERT INTO champions
SELECT *
FROM json_to_recordset($1) AS x(id INT, name TEXT, alias TEXT, square_url TEXT, release_date DATE); 
  `;
//enable RLS and bypass it with db roles

//preface to get json (json/skins) gives json for /skins
//assets github.com/CommunityDragon/Docs/blob/master/assets.md
//cdn endpoints (tileUrl) https://cdn.communitydragon.org/endpoints
//champ id/name/sqrUrl/role https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json
//release date https://wiki.leagueoflegends.com/en-us/List_of_champions#References
//champ detailed latest/plugins/rcp-be-lol-game-data/global/default/v1/champions

//ids kinda random since yunara 804, naafiri 950

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
