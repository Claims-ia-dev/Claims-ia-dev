import { motion, AnimatePresence } from "framer-motion";
import styles from "./mainModal.module.css";
import { AiFillCloseCircle, AiFillWarning, AiFillCheckCircle } from "react-icons/ai";
import { useNotificationContext } from "../../context/NotificationContext";
import { useUserData } from "../../context/UserContext";
import { deleteUserRoomMVP } from "../../controller/userOperation";
import { useEffect, useState } from "react";

export default function MainModal() {
  const { notification, setNotification } = useNotificationContext();
  const { userData, setUserData } = useUserData();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(notification.showModal);
  }, [notification.showModal]);

  const handleDeleteFunction = async () => {
    const res = await deleteUserRoomMVP(userData.id, userData.roomIdSelected);
    if (res) {
      console.log("Room deleted");
      setUserData((prev) => ({
        ...prev,
        showModal: false,
        rooms: prev.rooms.filter((room) => room.roommvp_id !== prev.roomIdSelected),
        roomIdSelected: "",
      }));
      setNotification({ ...notification, showModal: false });
    } else {
      alert("Error deleting room");
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.container}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
        >
          <div className={styles.modalContainerDelete}>
            <div className={styles.modalContent}>
              <p style={{ marginTop: "1em", fontSize: "1.4em", width: "100%", color: "#156FFF" }}>
                This action cannot be reversed
              </p>
              <AiFillWarning className={styles.iconInfo} />
              <div className={styles.buttonsContainer}>
                <button onClick={() => handleDeleteFunction()} className={styles.btnControl}>
                  <AiFillCheckCircle color="#156FFF" className={styles.iconBtn} />
                  Delete
                </button>
                <button onClick={() => setNotification({ ...notification, showModal: false })} className={styles.btnControl}>
                  <AiFillCloseCircle className={styles.iconBtn} />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
