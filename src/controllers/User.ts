import { Request, Response } from "express";
import { IExtendedRequest } from "../interfaces";
import { UserService } from "../services/User";
import { CheckPassword } from "../utils/CheckPassword";
import { JWTGenerator } from "../utils/JWTGenerator";

class UserController {
  async create(req: Request, res: Response) {
    const { username, password } = req.body;

    const userService = new UserService();
    const jwtGenerator = new JWTGenerator();

    try {
      const token = jwtGenerator.execute({ username });

      const user = await userService.create({ username, password });
      user.password = undefined;

      return res
        .status(201)
        .json({ message: "Usuário criado com sucesso!", user, token });
    } catch ({ error }) {
      console.error(error);
      return res.status(400).json(error);
    }
  }
  async login(req: IExtendedRequest, res: Response) {
    const userService = new UserService();
    const checkPassword = new CheckPassword();
    const jwtGenerator = new JWTGenerator();

    const { username, password } = req.attemptedLoginInfo;

    try {
      const user = await userService.getByUsername(username, true);

      if (!user) {
        return res.status(400).json({ message: "Usuário não encontrado!" });
      }

      const rightPass = await checkPassword.execute(password, user.password);

      if (!rightPass) {
        return res.status(401).json({ message: "Senha incorreta!" });
      }

      user.password = undefined;
      const token = jwtGenerator.execute({ username: user.username });

      return res.json({ message: "Logado com sucesso!", token });
    } catch (err) {
      console.error(err.message);
      return res
        .status(400)
        .json({ message: "Erro ao fazer login.", error: err.message });
    }
  }
}
export { UserController };
