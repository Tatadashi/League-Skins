import type { Request, Response } from "express";

export async function versionGet(req: Request, res: Response) {
  //e for edits on my side not Rito
  res.send("Patch 25.21 e1");
}
