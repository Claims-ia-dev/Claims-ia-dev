import { useAuth } from "../../controller/AuthContext";
import styles from "./admin.module.css";
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  console.log("admin", isAuthenticated);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  }

  return (
    <>
      {isAuthenticated ? (
        <div className={styles.adminContainer}>
          <h1>Admin</h1>
          <button onClick={handleLogout}>Log out</button>
        </div>
      ) : (
        <h1>Not logged in</h1>
      )}
    </>
  );
}
