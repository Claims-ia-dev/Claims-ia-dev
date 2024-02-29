import styles from "./EstimateLayout.module.css";
import { useUserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getUserRoomsWithAnswers,
  getEstimateProject,
} from "../../controller/userOperation";
import { deleteUserRoomsMVP } from "../../controller/userOperation";

export default function EstimateLayout() {
  const [userFinalData, setUserFinalData] = useState([]);
  const [estimate, setEstimate] = useState("false");

  function formatearNumero(numero) {
    // Utiliza toLocaleString para formatear el número con separadores de miles y decimales
    return parseFloat(numero).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  const navigate = useNavigate();
  const { userData, setUserData, estimateBill, setEstimateBill } =
    useUserData();

  const handleLogout = async () => {
    await deleteUserRoomsMVP(userData.id);
    setUserData((prev) => ({ ...prev, loginState: false }));
    console.log("userData.loginState", userData.loginState);
    navigate("/");
  };

  useEffect(() => {
    if (estimateBill === true) {
      const fetchData = async () => {
        try {
          const userFinalData = await getUserRoomsWithAnswers(userData.id);
          setUserFinalData(userFinalData);
          const requestData = userFinalData; // Assuming this is the correct data
          const estimated = await getEstimateProject(requestData);
          setEstimate(estimated);
          setEstimateBill(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [estimateBill, setEstimateBill, userData.id]);

  const handleRedirection = async () => {
    await deleteUserRoomsMVP(userData.id);
    navigate(`/admin/user/${userData.id}/room`);
  };


  return (
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
          <h1 className={styles.title}>${formatearNumero(userFinalData.acum)}</h1>
        </article>
        <article className={styles.projectsBtnContainer}>
          <button
            onClick={() => {
              handleRedirection();
            }}
            className={styles.btnProject}
          >
            New project
          </button>
          <button
            onClick={() => {
              handleLogout();
            }}
            className={styles.btnProject}
          >
            Log out
          </button>
        </article>
      </section>
    </>
  );
}
