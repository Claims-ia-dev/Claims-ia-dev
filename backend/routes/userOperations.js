import db from "../database/dbConnection.js";

export function createUser(req, res) {
  const { email, password } = req.body;
  console.log("email: " + email);
  console.log("password: " + password);

  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("Error al insertar en la base de datos:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      console.log("Usuario insertado correctamente");
      res.status(200).json({ success: true });
    }
  });
}

export function getUserById(req, res) {
  const { id } = req.params;
  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error al realizar la consulta:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      console.log("Consulta realizada correctamente");
      res.status(200).json(result);
    }
  });
}

export function getAllUsers(req, res) {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error al realizar la consulta:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      console.log("Consulta realizada correctamente");
      res.status(200).json(result);
    }
  });
}

export function logInUser(req, res) {
  const { email, password } = req.body;
  console.log("email: " + email);
  console.log("password: " + password);

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("Error al realizar la consulta:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      if (result.length > 0) {
        console.log("Inicio de sesión exitoso");
        res.status(200).json({ success: true });
      } else {
        console.log("Inicio de sesión fallido");
        res.status(401).json({ success: false, error: "Credenciales inválidas" });
      }
    }
  });
}
