import bcryptjs from "bcryptjs";
import { AppError } from "../errors/AppError";
class CheckPassword {
  async execute(password: string, hash: string) {
    try {
      return await bcryptjs.compare(password, hash);
    } catch (err) {
      throw new AppError({
        message: "Erro ao checar senha.",
        error: err.message,
      });
    }
  }
}

export { CheckPassword };
