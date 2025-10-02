import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

//varchar since (2022 prestige editions)
const SQL = `
CREATE TABLE IF NOT EXISTS skins (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp(0)
);

INSERT INTO skins (name)
VALUES
    ('Star Guardian Jinx'),
    ('Soul Fighter Lux');    
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB_CONNECTION_STRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
