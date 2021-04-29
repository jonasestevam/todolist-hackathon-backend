import { Request, Response } from "express";

class User {
  create(req: Request, res: Response) {
    const { username, password } = req.body;
    return res.json({ username, password });
  }
}

export { User };
