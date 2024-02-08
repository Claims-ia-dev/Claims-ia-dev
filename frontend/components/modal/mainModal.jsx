import styles from "./mainModal.module.css";
import { AiFillCloseCircle, AiFillWarning, AiFillCheckCircle } from "react-icons/ai";
import { useNotificationContext } from "../../context/NotificationContext";
import { useUserData } from "../../context/UserContext";
import { deleteUserRoomMVP } from "../../controller/userOperation";


export default function MainModal() {
  const { notification, setNotification } = useNotificationContext()
  const { userData, setUserData } = useUserData();


  const stateContainer = notification.showModal ? styles.container : styles.containerOff;

  const handleDeleteFunction = async () => {
    const res = await deleteUserRoomMVP( userData.id, userData.roomIdSelected);
    if (res) {
      console.log("Room deleted");
      setUserData((prev) => ({
        ...prev,
        showModal: false,
        rooms: prev.rooms.filter(room => room.roommvp_id !== prev.roomIdSelected),
        roomIdSelected: "",
      }));
      setNotification({...notification, showModal: false})
    } else {
      alert("Error deleting room");
    }
  }

  return (
    <>
      <div className={stateContainer}>
        <div className={styles.modalContainerDelete}>
          <div className={styles.modalContent}>
            <p style={{ marginTop: "1em", fontSize: "1.4em", width: "100%", color: "#156FFF"}}>
              This action cannot be reversed
            </p>
            <AiFillWarning className={styles.iconInfo} />
            <div className={styles.buttonsContainer}>
            <button onClick={()=>{handleDeleteFunction()}} className={styles.btnControl}>
                <AiFillCheckCircle color="#156FFF" className={styles.iconBtn} />Delete
              </button>
              <button onClick={()=>{setNotification({...notification, showModal: false})}} className={styles.btnControl}>
                <AiFillCloseCircle className={styles.iconBtn} />Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
