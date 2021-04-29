import { Document, model, Schema, Model } from "mongoose";
import bcryptjs from "bcryptjs";
import { IUser } from "../interfaces";

export interface UserModelInterface extends IUser, Document {}

const UserSchema: Schema<UserModelInterface> = new Schema({
  username: {
    required: true,
    unique: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  const hash = await bcryptjs.hash(this.password, 4);
  this.password = hash;
  next();
});

const User: Model<UserModelInterface> = model("User", UserSchema);

export { User };
