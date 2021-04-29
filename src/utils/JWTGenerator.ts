import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

class JWTGenerator {
  execute(payload: object) {
    try {
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
      return token;
    } catch (err) {
      throw new AppError({
        message: "Não foi possível gerar o token de autênticação",
        error: err.message,
      });
    }
  }
}
export { JWTGenerator };
