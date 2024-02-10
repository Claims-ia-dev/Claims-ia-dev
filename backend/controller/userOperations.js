import db from "../database/dbConnection.js";

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
        res.status(200).json({ success: true, data: result });
      } else {
        console.log("Inicio de sesión fallido");
        res
          .status(401)
          .json({ success: false, error: "Credenciales inválidas" });
      }
    }
  });
}

export function getUserById(req, res) {
  const { userId } = req.params;
  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error al realizar la consulta:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      console.log("Consulta realizada correctamente");
      res.status(200).json(result);
    }
  });
}

export const setUserRoomMVP = (req, res) => {
  const { userId } = req.params;
  const { roomName, roomType, checkboxStates } = req.body;

  const insertRoomSql = `
    INSERT INTO roommvp (user_id, name, roomtype) VALUES (?, ?, ?);
  `;

  db.query(insertRoomSql, [userId, roomName, roomType], (err, result) => {
    if (err) {
      console.error("Error al realizar la consulta para crear la habitación:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      const roomMvpId = result.insertId; // Obtenemos el ID del cuarto recién creado

      // Ahora, insertamos las respuestas
      const insertAnswerSql = `
        INSERT INTO room_answers (question_id, answer, roommvp_id)
        VALUES (?, ?, ?);
      `;

      Object.entries(checkboxStates).forEach(([questionIndex, answer]) => {
        const questionId = parseInt(questionIndex) + 1; // Convertir a entero y ajustar por empezar desde 0

        db.query(insertAnswerSql, [questionId, answer, roomMvpId], (err) => {
          if (err) {
            console.error('Error al insertar respuesta:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
          }
        });
      });

      console.log("Habitación y respuestas agregadas correctamente");
      res.status(200).json({ success: true });
    }
  });
};

export const setUserRoomMVPAnswer = (req, res) => {
  const { userId } = req.params;
  const { roommvp_id } = req.body;

  // Obtener las preguntas y sus IDs
  const getQuestionsSql = `SELECT id FROM questions`;
  db.query(getQuestionsSql, (err, questions) => {
    if (err) {
      console.error("Error al obtener preguntas:", err);
      res.status(500).json({ error: "Error interno del servidor" });
      return;
    }

    // Obtener el ID de la habitación basado en roommvp_id
    const getRoomIdSql = `SELECT id FROM roommvp WHERE roommvp_id = ?`;
    db.query(getRoomIdSql, [roommvp_id], (err, room) => {
      if (err) {
        console.error("Error al obtener el ID de la habitación:", err);
        res.status(500).json({ error: "Error interno del servidor" });
        return;
      }

      const roomId = room[0].id;

      const insertAnswersSql = `
        INSERT INTO room_answers (room_id, question_id, answer, roommvp_id)
        VALUES (?, ?, FALSE, ?);
      `;

      questions.forEach((question) => {
        db.query(insertAnswersSql, [roomId, question.id, roommvp_id], (err) => {
          if (err) {
            console.error("Error al insertar respuestas:", err);
            res.status(500).json({ error: "Error interno del servidor" });
            return;
          }
        });
      });

      res.status(200).json({ success: true });
    });
  });
};

export function getUserRoomMVP(req, res) {
  const { userId } = req.params;

  const sql = `
    SELECT roommvp.id AS roommvp_id, roommvp.name AS roommvp_name, roommvp.roomtype AS roomType, users.id AS user_id
    FROM users
    JOIN roommvp ON users.id = roommvp.user_id
    WHERE users.id = ?;
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error al realizar la consulta:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      console.log("Consulta realizada correctamente");
      res.status(200).json(result);
    }
  });
}



export const deleteUserRoomMVP = (req, res) => {
  const { roomId } = req.params;

  // Comienza por eliminar las respuestas relacionadas en room_answers
  const deleteAnswersSql = `
    DELETE FROM room_answers WHERE roommvp_id = ?;
  `;

  db.query(deleteAnswersSql, [roomId], (err, result) => {
    if (err) {
      console.error("Error al eliminar respuestas:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      // Ahora, elimina la habitación en roommvp
      const deleteRoomSql = `
        DELETE FROM roommvp WHERE id = ?;
      `;

      db.query(deleteRoomSql, [roomId], (err, result) => {
        if (err) {
          console.error("Error al eliminar la habitación:", err);
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          if (result.affectedRows > 0) {
            console.log("Habitación y respuestas eliminadas correctamente");
            res.status(200).json({ success: true });
          } else {
            console.log("No se encontró la habitación con el ID proporcionado");
            res.status(404).json({ error: "No se encontró la habitación con el ID proporcionado" });
          }
        }
      });
    }
  });
};


export const updateUserRoomMVP = (req, res) => {
  const { userId } = req.params;
  const { roomName, roomType, roomIdSelected, checkboxStates } = req.body;

  const updateRoomSql = `
    UPDATE roommvp
    SET name = ?, roomtype = ?
    WHERE user_id = ? AND id = ?;
  `;

  db.query(
    updateRoomSql,
    [roomName, roomType, userId, roomIdSelected],
    (err, result) => {
      if (err) {
        console.error("Error al realizar la consulta:", err);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        if (result.affectedRows > 0) {
          console.log("Habitación actualizada correctamente");

          // Ahora, actualiza las respuestas
          const updateAnswerSql = `
            UPDATE room_answers
            SET answer = ?
            WHERE roommvp_id = ? AND question_id = ?;
          `;

          Object.entries(checkboxStates).forEach(([questionIndex, answer]) => {
            const questionId = parseInt(questionIndex) + 1;

            db.query(
              updateAnswerSql,
              [answer ? 1 : 0, roomIdSelected, questionId],
              (err) => {
                if (err) {
                  console.error("Error al actualizar respuesta:", err);
                  res
                    .status(500)
                    .json({ error: "Error interno del servidor" });
                  return;
                }
              }
            );
          });

          res.status(200).json({ success: true });
        } else {
          console.log("Usuario no encontrado o ningún cambio realizado");
          res
            .status(404)
            .json({
              error: "Usuario no encontrado o ningún cambio realizado",
            });
        }
      }
    }
  );
};



export const getRoomAnswers = (req, res) => {
  const { roomId } = req.params;

  const sql = `
    SELECT
      ra.question_id,
      ra.answer
    FROM
      roommvp r
    JOIN
      room_answers ra ON r.id = ra.roommvp_id
    WHERE
      r.id = ?;
  `;

  db.query(sql, [roomId], (err, result) => {
    if (err) {
      console.error("Error al realizar la consulta para obtener datos del cuarto:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      res.status(200).json({ data: result });
    }
  });
};



export function getUserRoomsWithAnswers(req, res) {
  const { userId } = req.params;

  const sql = `
    SELECT
      rm.id AS roommvp_id,
      rm.name AS roommvp_name,
      rm.roomtype AS roomType,
      q.code AS question_code,
      ra.answer
    FROM
      users u
    JOIN
      roommvp rm ON u.id = rm.user_id
    LEFT JOIN
      room_answers ra ON rm.id = ra.roommvp_id
    LEFT JOIN
      questions q ON ra.question_id = q.id
    WHERE
      u.id = ?;
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error al realizar la consulta:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      console.log("Consulta realizada correctamente");

      const roomsWithQuestions = result.reduce((acc, row) => {
        const { roommvp_id, roommvp_name, roomType, question_code, answer } = row;

        const existingRoom = acc.find((room) => room.roommvp_id === roommvp_id);

        const booleanAnswer = answer === 1;

        if (!existingRoom) {
          acc.push({
            roommvp_id,
            roommvp_name,
            roomType,
            questions: [{ question_code, answer: booleanAnswer }],
          });
        } else {
          existingRoom.questions.push({ question_code, answer: booleanAnswer });
        }

        return acc;
      }, []);

      res.status(200).json(roomsWithQuestions);
    }
  });
}
