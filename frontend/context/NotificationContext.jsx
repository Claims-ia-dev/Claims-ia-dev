import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

  const [notification, setNotification] = useState({
    showModal: false,
    modalStatus: "",
    idMessage: "",
    handleCloseFunction: null,
    confirmState: false,
  });

  const setNotificationProp = (prop, value) => {
    setNotification((prev) => ({ ...prev, [prop]: value }));
  }

return (
  <>
    <NotificationContext.Provider
      value={{notification, setNotification, setNotificationProp}}
    >
      {children}
    </NotificationContext.Provider>
  </>
);

};
export const useNotificationContext = () => useContext(NotificationContext);

