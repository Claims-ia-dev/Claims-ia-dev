import express from "express";
import cors from "cors";
import { dbConnect } from "./database/dbConnection.js";
import { getUserById, logInUser } from "./controller/userOperations.js";

import {
  getUserRoomMVP,
  setUserRoomMVP,
  deleteUserRoomMVP,
  updateUserRoomMVP,
  getRoomAnswers,
  getUserRoomsWithAnswers,
  deleteUserRoomsMVP,
} from "./controller/userOperations.js";

const app = express();
const port = 3000 || process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();

app.post("/api/logInUser", logInUser);
app.get("/api/getUser/:userId", getUserById);

app.get("/api/getUser/:userId/roomsMVP", getUserRoomMVP);
app.post("/api/getUser/:userId/roomsMVP", setUserRoomMVP);
app.put("/api/getUser/:userId/roomsMVP", updateUserRoomMVP);
app.delete("/api/getUser/:userId/roomsMVP/:roomId", deleteUserRoomMVP);
app.delete("/api/getUser/:userId/roomsMVP", deleteUserRoomsMVP);
app.get("/api/getUser/:userId/roomsMVP/:roomId/questions", getRoomAnswers);
app.get("/api/getUser/:userId/roomsMVPAll/", getUserRoomsWithAnswers);

app.use((req, res) => {
  res.status(404).send("Página no encontrada");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
