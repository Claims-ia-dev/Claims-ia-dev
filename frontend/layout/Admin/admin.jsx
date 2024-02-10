import { useUserData } from "../../context/UserContext";
import styles from "./admin.module.css";
import Navbar from "../../components/navbar/navbar"
import MainModal from "../../components/modal/mainModal";



export default function Admin({children}) {
  const { userData } = useUserData();

  return (
    <>
      {userData.loginState && (
        <div className={styles.adminContainer}>
          <Navbar />
          <MainModal />
          {children}
        </div>
      )}
    </>
  );
}