import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

class TaskValidator {
  async execute(req: Request, res: Response, next: NextFunction) {
    const { title } = req.body;

    const taskSchema = yup.object().shape({
      title: yup
        .string()
        .defined()
        .min(3, "Tarefa deve ter ao menos 3 caracteres")
        .max(100, "Tarefa pode ter no máximo 100 caracteres."),
    });

    try {
      await taskSchema.validate({ title });
      return next();
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message, error: err });
    }
  }
}

export { TaskValidator };
