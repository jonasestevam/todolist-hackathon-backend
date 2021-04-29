import { Request, Response } from "express";
import { UserService } from "../services/User";

class User {
  async create(req: Request, res: Response) {
    const { username, password } = req.body;
    const userService = new UserService();

    try {
      const user = await userService.create({ username, password });
      user.password = undefined;
      return res.json({ message: "Usuário criado com sucesso!", user });
    } catch (err) {
      console.error(err);
      return res.status(400).json(err);
    }
  }
}
export { User };
