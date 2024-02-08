import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "../context/UserContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { NotificationProvider } from "../context/NotificationContext";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";


ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <PrimeReactProvider>
      <NotificationProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </NotificationProvider>
      </PrimeReactProvider>
    </BrowserRouter>
);
