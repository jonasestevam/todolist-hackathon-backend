import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

class UserValidator {
  async execute(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    const personSchema = yup.object().shape({
      username: yup
        .string()
        .defined()
        .min(3, "Nome de usuário deve ter ao menos 3 caracteres")
        .max(20, "Nome de usuário pode ter no máximo 20 caracteres."),
      password: yup
        .string()
        .defined()
        .min(6, "Senha precisa ter ao menos 6 caracteres."),
    });

    try {
      await personSchema.validate({ username, password });
      return next();
    } catch (err) {
      return res.status(400).json({ message: err.message, error: err });
    }
  }
}

export { UserValidator };
