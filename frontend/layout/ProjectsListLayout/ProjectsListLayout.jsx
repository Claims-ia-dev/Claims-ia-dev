import { useUserData } from "../../context/UserContext";
import styles from "./ProjectsListLayout.module.css";
import { TbEdit } from "react-icons/tb";
import { IoIosTrash } from "react-icons/io";
import { useNotificationContext } from "../../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../Admin/admin.jsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState} from "react";


export default function ProjectsContainer () {
    const { userData, setUserData, estimateBill, setEstimateBill} = useUserData();
    const { setNotification, notification } = useNotificationContext();
    const navigate = useNavigate();
    const [routeActive, setRouteActive] = useState(null);

    const variants = {
      hidden:{
        opacity: 0,
      },
      visible:{
        opacity: 1,
        transition: {
          duration: 0.5,
        },
      },
      }

      useEffect(() => {
        if(userData?.rooms?.length <= 0){
          setRouteActive(true);
        }
        else{
          setRouteActive(false);
        }
      }, [userData, navigate]);

      const handleEditFunction = (id) => {
        setUserData({ ...userData, roomIdSelected: id });
        navigate(`/admin/user/${userData.id}/room/edit`);
      }

      const activateStyle = routeActive
        ? styles.btnProjectDeactivate
        : styles.btnProjectActivate;




    return (
      <AdminLayout>
          <section className={styles.projectListContainer}>
            <AnimatePresence>
              <article className={styles.listContainer}>
                {userData.rooms.map((room, index) => (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={variants}
                    layoutId={index}
                    key={index}
                    className={styles.projectCard}>
                    <p>{room.roommvp_name}</p>
                    <div className={styles.iconsContainer}>
                      <TbEdit
                        className={styles.iconProject}
                        onClick={()=>{handleEditFunction(room.roommvp_id)}}
                        color="#156FFF"
                      />
                      <IoIosTrash
                        className={styles.iconProject}
                        onClick={() => {
                          setNotification({ ...notification, showModal: true });
                          setUserData({ ...userData, roomIdSelected: room.roommvp_id });
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </article>
            </AnimatePresence>
            <article className={styles.projectsBtnContainer}>
              <button onClick={()=>{navigate(`/admin/user/${userData.id}/room`)}} className={styles.btnProject}>Add new room</button>
              <button onClick={()=>{!routeActive && navigate(`/admin/user/${userData.id}/estimate`); setEstimateBill(true)}} className={activateStyle}>Calculate estimate</button>
            </article>
          </section>
      </AdminLayout>
    );
  }


