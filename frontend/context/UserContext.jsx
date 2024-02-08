import { createContext, useContext, useState, useEffect } from "react";
import { getUserRoomMVP } from "../controller/userOperation";

const UserDataContext = createContext();

export const UserProvider = ({ children }) => {

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    id: "",
    rooms: [],
    roomIdSelected: "",
    loginState: false,
    deleteFunction: false,
    refetch: false,
  });

  useEffect(() => {
    if (userData.loginState) {
      getUserRoomMVP(userData.id).then((res) => {
        setUserData((prev) => ({ ...prev, rooms: res, refetch: false}));
      });
    }
  }, [userData.loginState, userData.id, userData.rooms.length, userData.refetch]);

  console.log("userData", userData);
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);