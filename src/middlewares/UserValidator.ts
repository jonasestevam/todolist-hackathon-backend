import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

class UserValidator {
  async execute(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    const personSchema = yup.object().shape({
      username: yup.string().defined().min(3).max(20),
      password: yup.string().defined().min(6),
    });

    try {
      await personSchema.validate({ username, password });
      return next();
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Erro na validação dos dados.", error: err.message });
    }
  }
}

export { UserValidator };
