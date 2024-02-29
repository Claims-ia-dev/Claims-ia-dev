import express from "express";
import cors from "cors";
import { dbConnect } from "./database/dbConnection.js";
import { getUserById, logInUser, predictItem } from "./controller/userOperations.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url)
var https = require('https');
var fs =  require('fs');

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {
  getUserRoomMVP,
  setUserRoomMVP,
  deleteUserRoomMVP,
  updateUserRoomMVP,
  getRoomAnswers,
  getUserRoomsWithAnswers,
  deleteUserRoomsMVP,
} from "./controller/userOperations.js";


// var httpsOptions = {
//   key: fs.readFileSync('/etc/letsencrypt/live/claims.ai.onlinesolutionsusa.net/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/claims.ai.onlinesolutionsusa.net/fullchain.pem')
// };


const app = express();
const port = 3000 || process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const corsOptions ={
//     origin:'*', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

dbConnect();

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.post("/api/logInUser", logInUser);
app.post("/api/preditem", predictItem);
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

// https.createServer(httpsOptions, app).listen(4433);
