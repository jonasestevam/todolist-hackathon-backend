require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import { routes } from "./routes";

const app = express();

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
