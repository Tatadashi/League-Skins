import type { Request, Response } from "express";
import { getAllSkins, getSkin } from "../models/skinModel/skinQuery.ts";

export async function skinAllGet(req: Request, res: Response) {
  res.send(await getAllSkins());
}

export async function skinIDGet(req: Request, res: Response) {
  res.send(await getSkin(Number(req.params.championID)));
}
