import { Types } from "mongoose";
import { AppError } from "../errors/AppError";
import { ITask } from "../interfaces";
import { Task } from "../models/Task";

class TaskService {
  private throwError(message: string, err?: any) {
    console.error(message, err);
    throw new AppError({ message: message, error: err });
  }
  async create(task: ITask) {
    try {
      return await Task.create(task);
    } catch (err) {
      this.throwError("Erro ao criar tarefa.", err.message);
    }
  }
  async getAllFromUser(username: string) {
    try {
      return await Task.find({ username });
    } catch (err) {
      this.throwError("Erro ao pegar a lista de tarefas.", err.message);
    }
  }
  async update(id: string, username: string, update: object) {
    try {
      return await Task.findOneAndUpdate(
        { _id: Types.ObjectId(id), username },
        update,
        {
          new: true,
        }
      );
    } catch (err) {
      this.throwError("Erro ao atualizar tarefa.", err.message);
    }
  }
}

export { TaskService };
