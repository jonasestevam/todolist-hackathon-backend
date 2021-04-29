import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { IExtendedRequest } from "../interfaces";

class BasicAuthHeaderValidator {
  async execute(req: IExtendedRequest, res: Response, next: NextFunction) {
    const [, hash] = req.headers.authorization.split(" ");
    const [username, password] = Buffer.from(hash, "base64")
      .toString()
      .split(":");

    const schema = yup.object().shape({
      username: yup.string().defined(),
      password: yup.string().defined(),
    });

    try {
      await schema.validate({ username, password });
      req.attemptedLoginInfo = { username, password };
      return next();
    } catch (err) {
      return res.status(400).json({
        message: "Erro na validação dos headers.",
        error: err.message,
      });
    }
  }
}

export { BasicAuthHeaderValidator };
