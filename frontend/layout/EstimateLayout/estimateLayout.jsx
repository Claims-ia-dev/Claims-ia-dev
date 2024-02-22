import styles from "./EstimateLayout.module.css";
import AdminLayout from "../Admin/admin.jsx";
import { useUserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserRoomsWithAnswers, getEstimateProject } from "../../controller/userOperation";
import { deleteUserRoomsMVP } from "../../controller/userOperation";



export default function EstimateLayout() {

  const [userFinalData, setUserFinalData] = useState([]);

  const navigate = useNavigate();
  const { userData, setUserData } = useUserData();

  const handleLogout = async () => {
    await deleteUserRoomsMVP(userData.id);
    setUserData((prev) => ({ ...prev, loginState: false }));
    console.log("userData.loginState", userData.loginState);
    navigate("/");
  };

  const generateInfo = async () => {
    try {
      const userFinalData = await getUserRoomsWithAnswers(userData.id);
      setUserFinalData(userFinalData);
    } catch (error) {
      console.error("Error al obtener respuestas:", error);
    }
  }

  const getEstimate = async (requestData) => {
    try {
      const response = await getEstimateProject(requestData);
      console.log("response", response);
    } catch (error) {
      console.error("Error al obtener estimado:", error);
    }
  }

  const handleRedirection = async () => {
    await deleteUserRoomsMVP(userData.id);
    navigate(`/admin/user/${userData.id}/room`);
  }

  console.log("userFinalData", userFinalData);

  return (
    // <AdminLayout>
    <>
    <nav className={styles.navbarContainer}>
    <ul>
      <li>
        <img src="/logo.svg" alt="Logo Claims.AI" />
      </li>
    </ul>
  </nav>
      <section className={styles.estimateContainer}>
        <article className={styles.infoContainer}>
          <p>The estimated amount for this project is:</p>
          <h1 className={styles.title}>$5,000.00</h1>
        </article>
        <article  className={styles.projectsBtnContainer}>
          <button onClick={()=>{handleRedirection()}} className={styles.btnProject}>New project</button>
          <button onClick={async ()=>{ await generateInfo()}} className={styles.btnProject}>Calculate estimate</button>
          {/* <button onClick={async ()=>{ await getEstimate()}} className={styles.btnProject}>Calculate estimate</button> */}
          {/* <button onClick={() => {handleLogout();}} className={styles.btnProject}>Log out</button> */}
        </article>
      </section>
      </>
    // </AdminLayout>
  );
}
