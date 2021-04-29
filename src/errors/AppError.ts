import { IAppError } from "../interfaces";

class AppError {
  error: IAppError;
  constructor(error: IAppError) {
    this.error = error;
  }
}

export { AppError };
