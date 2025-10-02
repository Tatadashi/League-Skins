import type { Request, Response } from "express";

export async function catalogGet(req: Request, res: Response) {
  res.send("Received a GET HTTP Request");
}

export async function catalogPost(req: Request, res: Response) {
  res.send("Received a POST HTTP Request");
}

export async function catalogPut(req: Request, res: Response) {
  res.send("Received a PUT HTTP Request");
}

export async function catalogDelete(req: Request, res: Response) {
  res.send("Received a DELETE HTTP Request");
}
