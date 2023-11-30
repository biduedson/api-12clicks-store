import "dotenv/config";
import express from "express";

const app = express();
app.use(express.json());

app.listen("4200", () => {
  console.log("Servidor rodando na porta 4200");
});
