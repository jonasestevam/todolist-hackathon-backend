import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { isNamedExportBindings } from "typescript";

import { IExtendedRequest } from "../interfaces";

class UserAuthentication {
  async execute(req: IExtendedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    const responseError = () => {
      return res.status(401).json({
        error: "Problema no header de autênticação.",
        message: "Acesso negado.",
      });
    };

    if (!authHeader) {
      return responseError();
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
      return responseError();
    }

    const [, token] = parts;

    if (!token) {
      return responseError();
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) return responseError();

      req.user = decoded;
      return next();
    });
  }
}
export { UserAuthentication };
