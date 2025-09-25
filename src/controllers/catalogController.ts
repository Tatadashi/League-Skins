import type { Request, Response } from "express";

export async function catalogGet(req: Request, res: Response) {
    res.render('index');
};