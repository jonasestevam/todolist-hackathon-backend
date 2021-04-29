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
}

export { TaskService };
