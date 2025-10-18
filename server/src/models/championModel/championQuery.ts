import { pool } from "../pool.ts";

export async function getAllChampions() {
  const { rows } = await pool.query("SELECT * FROM champions ORDER BY name");
  return rows;
}

export async function getChampion(id: number) {
  const { rows } = await pool.query(`SELECT * FROM champions WHERE id = ${id}`);
  return rows;
}
