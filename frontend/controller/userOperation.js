export const createUser = async ({ email, password}) => {
    try {
      const response = await fetch("http://localhost:3000/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        console.log("Login successful");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  export const logInUser = async ({ email, password }) => {
    try {
      const response = await fetch("http://localhost:3000/api/logInUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (true) {
        const data = await response.json();
        console.log("Login successful:", data);
        return true;
      } else {
        console.error("Login failed");
        return false;
      }
    } catch (error) {
      console.error("Network error:", error);
      return false;
    }
  };
