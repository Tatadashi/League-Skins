import type { Request, Response } from "express";
import { getSkin } from "../models/skinModel/skinQuery.ts";

export async function skinAllGet(req: Request, res: Response) {
  res.send("Received a GET HTTP Request");
}

export async function skinIDGet(req: Request, res: Response) {
  res.send(await getSkin(Number(req.params.skinID)));
}

export async function skinPost(req: Request, res: Response) {
  res.send("Received a POST HTTP Request");
}

export async function skinPut(req: Request, res: Response) {
  res.send("Received a PUT HTTP Request");
}

export async function skinDelete(req: Request, res: Response) {
  res.send("Received a DELETE HTTP Request");
}
