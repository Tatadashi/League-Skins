import { skinsPool } from "./skinsPool.ts";

export async function getSkin(id: number) {
  const { rows } = await skinsPool.query(
    `SELECT * FROM skins WHERE id = ${id}`,
  );
  return rows;
}

//get skins from champ
//get skins from rarity tier
//get skins where name similar to string
