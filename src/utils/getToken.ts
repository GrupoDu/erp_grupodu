import type { Request, Response } from "express";

export function getToken(req: Request, res: Response): string {
  const auth = req.cookies?.token;

  if (!auth) {
    console.log("Cookie token não encontrado. req.cookies:", req.cookies);
    throw new Error("TOKEN_NOT_PROVIDED");
  }

  return auth;
}
