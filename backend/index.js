import express from 'express';
import cors from 'cors';
import { dbConnect } from "./database/dbConnection.js";
import { createUser, getAllUsers, getUserById, logInUser } from "./routes/userOperations.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();


app.post("/api/createUser", createUser);
app.get("/api/getUser/:id", getUserById);
app.get("/api/getUser", getAllUsers);
app.post("/api/logInUser", logInUser);


app.use((req, res) => {
  res.status(404).send("Página no encontrada");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});




