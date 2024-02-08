

export const logInUser = async ({ email, password }) => {
  try {
    const response = await fetch("http://localhost:3000/api/logInUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      // console.log("Login successful:", data);
      return data;
    } else {
      console.error("Login failed");
      return false;
    }
  } catch (error) {
    console.error("Network error:", error);
    return false;
  }
};

export const setUserRoomMVP = async (userId, roomName, roomType, checkboxStates) => {
  try {
    const response = await fetch(`http://localhost:3000/api/getUser/${userId}/roomsMVP`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomName, roomType, checkboxStates }), // Incluye roomType en el cuerpo de la solicitud
    });

    if (response.ok) {
      console.log("Room added successfully");
      return true;
    } else {
      console.error("Failed to add room");
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};

export const updateUserRoomMVP = async (userId, roomName, roomType, roomIdSelected, checkboxStates) => {
  try {
    const response = await fetch(`http://localhost:3000/api/getUser/${userId}/roomsMVP`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomName, roomType, roomIdSelected, checkboxStates }),
    });

    if (response.ok) {
      console.log("Room updated successfully");
      return true;
    } else {
      console.error("Failed to update room");
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};

export const getUserRoomMVP = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/getUser/${userId}/roomsMVP`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to get user room MVPs");
      return false;
    }
  } catch (error) {
    console.error("Network error:", error);
    return false;
  }
};

export const deleteUserRoomMVP = async (userId, roomId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/getUser/${userId}/roomsMVP/${roomId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Room deleted successfully");
      return true;
    } else {
      console.error("Failed to delete room");
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};

export const getRoomAnswers = async (userId, roomId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/getUser/${userId}/roomsMVP/${roomId}/questions`);
    const data = await response.json();

    if (response.ok) {
      console.log("Datos del cuarto y respuestas:", data);
      return data.data;
    } else {
      console.error("Error al obtener datos del cuarto");
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};

export const getUserRoomsWithAnswers = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/getUser/${userId}/roomsMVPAll/`);
    const data = await response.json();

    if (response.ok) {
      console.log("Respuestas del cuarto:", data);
      return data;
    } else {
      console.error("Error al obtener respuestas del cuarto");
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};
