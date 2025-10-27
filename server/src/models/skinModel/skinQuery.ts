import { pool } from "../pool.ts";

export async function getAllSkins() {
  const { rows } = await pool.query(
    "SELECT * FROM skins ORDER BY championName",
  );
  return rows;
}

export async function getSkin(id: number) {
  const { rows } = await pool.query(`SELECT * FROM skins WHERE id = ${id}`);
  return rows;
}

//get skins from champ
//get skins from rarity tier
//get skins where name similar to string
