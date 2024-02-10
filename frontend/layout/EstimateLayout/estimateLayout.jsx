import styles from "./EstimateLayout.module.css";
import AdminLayout from "../Admin/admin.jsx";
import { useUserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUserRoomsWithAnswers } from "../../controller/userOperation";

export default function EstimateLayout() {
  const { userData } = useUserData();
  const navigate = useNavigate();
  const [userFinalData, setUserFinalData] = useState([]);

  const generateInfo = async () => {
    try {
      const userFinalData = await getUserRoomsWithAnswers(userData.id);
      setUserFinalData(userFinalData);
    } catch (error) {
      console.error("Error al obtener respuestas:", error);
    }
  }

  console.log("userFinalData", userFinalData);

  return (
    <AdminLayout>
      <section className={styles.estimateContainer}>
        <article className={styles.infoContainer}>
          <p>This is the estimate of your project.</p>
          <h1 className={styles.title}>$5,000.00</h1>
        </article>
        <article  className={styles.projectsBtnContainer}>
          <button onClick={()=>{navigate(`/admin/user/${userData.id}/room`)}} className={styles.btnProject}>new project</button>
          <button onClick={async ()=>{ await generateInfo()}} className={styles.btnProject}>calculate estimate</button>
        </article>
      </section>
    </AdminLayout>
  );
}
