import styles from "./EstimateLayout.module.css";
import { useUserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getUserRoomsWithAnswers,
  getEstimateProject,
} from "../../controller/userOperation";
import { deleteUserRoomsMVP } from "../../controller/userOperation";
import Loader from "../../components/loader/loader";

export default function EstimateLayout() {
  const [userFinalData, setUserFinalData] = useState([]);
  const [estimated, setEstimated] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userData, setUserData, estimateBill, setEstimateBill } = useUserData();


  
  function parseNumber(numero) {
    // Utiliza toLocaleString para formatear el número con separadores de miles y decimales
    return parseFloat(numero).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

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
          setLoading(true);
          const response = await getUserRoomsWithAnswers(userData.id);
          setUserFinalData(response);
          // const estimated = await getEstimateProject(response);
          // console.log("estimated", estimated.acum);
          // setEstimated(estimated);
          setEstimateBill(false);
          setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
          setEstimated(null); // Puedes manejar el estado de estimated en caso de error
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [userData.id, estimateBill, setEstimateBill]);


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
          <h1 className={styles.title}>
            {loading ? <Loader /> : `$${parseNumber(userFinalData.acum)}`}
          </h1>
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
