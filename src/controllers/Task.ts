import { Response } from "express";
import { IExtendedRequest } from "../interfaces";
import { TaskService } from "../services/Task";

class TaskController {
  async create(req: IExtendedRequest, res: Response) {
    const taskService = new TaskService();
    const { title } = req.body;
    const { username } = req.user;

    try {
      const task = await taskService.create({ title, username });
      return res.json({ message: "Tarefa criada.", task });
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Não foi possível criar a tarefa." });
    }
  }
}

export { TaskController };
