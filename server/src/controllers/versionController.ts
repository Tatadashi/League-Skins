import type { Request, Response } from "express";

export async function versionGet(req: Request, res: Response) {
  res.send("Patch 25.21");
}
