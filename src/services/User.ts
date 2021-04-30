import { AppError } from "../errors/AppError";
import { IUser } from "../interfaces";
import { User } from "../models/User";

class UserService {
  private throwError(message: string, err?: any) {
    console.error(message, err);
    throw new AppError({ message: message, error: err });
  }

  async create(user: IUser) {
    const exists = await this.getByUsername(user.username);
    if (exists) {
      this.throwError(`O usário ${user.username} já existe!`);
    }
    try {
      return await User.create(user);
    } catch (err) {
      this.throwError("Erro ao criar usuário.", err);
    }
  }
  async getByUsername(username: string, selectPassword?: boolean) {
    try {
      return selectPassword
        ? await User.findOne({ username }).select("+password")
        : await User.findOne({ username });
    } catch (err) {
      this.throwError(`Erro ao consultar usuário ${username}`, err.message);
    }
  }
}

export { UserService };
