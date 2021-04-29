import { Document, model, Schema, Model } from "mongoose";
import { ITask } from "../interfaces";

interface ITaskModel extends ITask, Document {}

const TaskSchema: Schema<ITaskModel> = new Schema({
  title: {
    required: true,
    type: String,
  },
  completed: {
    required: true,
    type: Boolean,
    default: false,
  },
  username: {
    required: true,
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task: Model<ITaskModel> = model("Task", TaskSchema);

export { Task, ITaskModel };
