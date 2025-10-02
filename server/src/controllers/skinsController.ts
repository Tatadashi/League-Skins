import type { Request, Response } from "express";
import { getSkin } from "../models/skinsModel/skinsQueries.ts";

export async function skinsGet(req: Request, res: Response) {
  res.send("Received a GET HTTP Request");
}

export async function skinsIDGet(req: Request, res: Response) {
  res.send(await getSkin(Number(req.params.skinID)));
}

export async function skinsPost(req: Request, res: Response) {
  res.send("Received a POST HTTP Request");
}

export async function skinsPut(req: Request, res: Response) {
  res.send("Received a PUT HTTP Request");
}

export async function skinsDelete(req: Request, res: Response) {
  res.send("Received a DELETE HTTP Request");
}
