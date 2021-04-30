import { Request, Response } from "express";
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
    } catch ({ error }) {
      return res.status(400).json(error);
    }
  }

  async update(req: IExtendedRequest, res: Response) {
    const { id } = req.params;
    const { update } = req.body;
    const { username } = req.user;

    const taskService = new TaskService();

    try {
      const updatedTask = await taskService.update(id, username, update);
      return res.json({ message: "Tarefa atualiza.", task: updatedTask });
    } catch ({ error }) {
      return res.status(400).json(error);
    }
  }
}

export { TaskController };
