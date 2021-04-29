import { AppError } from "../errors/AppError";
import { IUser } from "../interfaces";
import { User } from "../models/User";
class UserService {
  async create(user: IUser) {
    try {
      return await User.create(user);
    } catch (err) {
      console.error(`Erro ao criar usuário.`, err);
      throw new AppError({ message: "Erro ao criar usuário.", error: err });
    }
  }
}

export { UserService };
