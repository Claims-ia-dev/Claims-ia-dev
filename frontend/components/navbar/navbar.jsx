import styles from "./navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../context/UserContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { userData, setUserData } = useUserData();

  const handleLogout = () => {
    setUserData((prev) => ({ ...prev, loginState: false }));
    console.log("userData.loginState", userData.loginState);
    navigate("/");
  };
  return (
    <nav className={styles.navbarContainer}>
      <ul>
        <li>
          <img src="/logo.svg" alt="Logo Claims.AI" />
        </li>
        <li>
          <button
            className={styles.logOutBtn}
            onClick={() => {
              handleLogout();
            }}
          >
            Log out
          </button>
        </li>
      </ul>
    </nav>
  );
}
