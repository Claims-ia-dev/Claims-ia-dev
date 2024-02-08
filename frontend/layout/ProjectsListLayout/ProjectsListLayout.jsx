import { useUserData } from "../../context/UserContext";
import styles from "./ProjectsListLayout.module.css";
import { TbEdit } from "react-icons/tb";
import { IoIosTrash } from "react-icons/io";
import { useNotificationContext } from "../../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import { getUserRoomsWithAnswers } from "../../controller/userOperation";


export default function ProjectsContainer () {
    const { userData, setUserData } = useUserData();
    const { setNotification, notification } = useNotificationContext();
    const navigate = useNavigate();


    const generateInfo = async () => {
      try {
        const roomAnswers = await getUserRoomsWithAnswers(userData.id);
        console.log("roomAnswers", roomAnswers);
      } catch (error) {
        console.error("Error al obtener respuestas:", error);
      }
    }

    return (
      <>
        <section className={styles.projectListContainer}>
          <article className={styles.listContainer}>
            {userData.rooms.map((room, index) => (
              <div key={index} className={styles.projectCard}>
                <p>{room.roommvp_name}</p>
                <div className={styles.iconsContainer}>
                  <TbEdit
                    onClick={()=>{
                      setUserData({ ...userData, roomIdSelected: room.roommvp_id });
                      navigate(`/admin/user/${userData.id}/room/edit`);
                    }}
                  fontSize={"1.8em"} color="#156FFF" />
                  <IoIosTrash
                    onClick={() => {
                      setNotification({ ...notification, showModal: true });
                      setUserData({ ...userData, roomIdSelected: room.roommvp_id });
                    }}
                    fontSize={"1.8em"}
                  />
                </div>
              </div>
            ))}
          </article>
          <article className={styles.projectsBtnContainer}>
            <button onClick={()=>{navigate(`/admin/user/${userData.id}/room`)}} className={styles.btnProject}>Add new room</button>
            {/* <button onClick={()=>{navigate(`/admin/user/${userData.id}/estimate`)}} className={styles.btnProject}>Calculate estimate</button> */}
            <button onClick={async()=>{await generateInfo()}} className={styles.btnProject}>Calculate estimate</button>

          </article>
        </section>
      </>
    );
  }