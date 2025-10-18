import type { Request, Response } from "express";
import {
  getAllChampions,
  getChampion,
} from "../models/championModel/championQuery.ts";

export async function championAllGet(req: Request, res: Response) {
  res.send(await getAllChampions());
}

export async function championIDGet(req: Request, res: Response) {
  res.send(await getChampion(Number(req.params.championID)));
}
