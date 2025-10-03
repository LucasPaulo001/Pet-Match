import express from "express";
import dotenv from "dotenv";
import router from "./routes/router.js";
import { dbConnection } from "./db/dbConnection.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rotas
app.use(router);

//Banco de dados
dbConnection();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Conectado ao servidor na porta - ${PORT}`);
});
