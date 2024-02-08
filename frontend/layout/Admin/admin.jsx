import { useUserData } from "../../context/UserContext";
import styles from "./admin.module.css";
import { useNavigate } from "react-router-dom";
import MainModal from "../../components/modal/mainModal";
import ProjectsListLayout from "../../layout/ProjectsListLayout/ProjectsListLayout"
import Navbar from "../../components/navbar/navbar";



export default function Admin() {
  const navigate = useNavigate();
  const { userData, setUserData } = useUserData();

  const handleLogout =  () => {
    setUserData((prev) => ({ ...prev, loginState: false }));
    console.log("userData.loginState", userData.loginState);
    navigate("/");
  };

  return (
    <>
      <MainModal />
      {userData.loginState && (
        <div className={styles.adminContainer}>
          <Navbar handleLogOut={handleLogout} />
          {userData.rooms.length > 0 ? <ProjectsListLayout /> : navigate(`/admin/user/${userData.id}/room`)}
        </div>
      )}
    </>
  );
}