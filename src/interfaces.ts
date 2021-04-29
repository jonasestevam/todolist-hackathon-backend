import { Request } from "express";

export interface IUser {
  username: string;
  password: string;
}

export interface IAppError {
  message: string;
  error?: string;
}

export interface IExtendedRequest extends Request {
  attemptedLoginInfo?: {
    username: string;
    password: string;
  };
  user?: any;
}

export interface ITask {
  title: string;
  completed?: boolean;
  username: string;
}
