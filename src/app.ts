require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { routes } from "./routes";

const app = express();
app.use(cors());

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    err ? console.log(err) : console.log("Banco de dados conectado!");
  }
);

app.use(express.json());
app.use("/api", routes);

export { app };
