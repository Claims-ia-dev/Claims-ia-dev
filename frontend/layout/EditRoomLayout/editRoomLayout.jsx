import { useState, useEffect } from "react";
import { useUserData } from "../../context/UserContext";
import styles from "./editRoomLayout.module.css";
import { updateUserRoomMVP } from "../../controller/userOperation";
import { useNavigate } from "react-router-dom";
import data from "../../public/questions.json";
import { getRoomAnswers } from "../../controller/userOperation";
import AdminLayout from "../Admin/admin.jsx";
import DropdownInput from "../../components/inputs/dropDownInput/dropDownInput.jsx";
import TablePagination from "../../components/tablePagination/tablePagination.jsx";

export default function CreateProjectContainer() {
  const { userData, setUserData } = useUserData();

  const selectedRoom = userData.rooms.find(
    (room) => room.roommvp_id === userData.roomIdSelected
  );

  const [questionsView, setQuestionsView] = useState(false);

  const [roomName, setRoomName] = useState(selectedRoom?.roommvp_name);
  const [roomType, setRoomType] = useState(selectedRoom?.roomType);
  const [serviceTypeName, setServiceTypeName] = useState(
    selectedRoom?.serviceTypeName
  );

  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);

  const pageSize = 15;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(data.length / pageSize);
  const startingIndex = currentPage * pageSize;

  const paginatedData = data.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );
  const [checkboxStates, setCheckboxStates] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const updateAnswers = async () => {
      try {
        const answers = await getRoomAnswers(
          userData.id,
          userData.roomIdSelected
        );
        if (answers) {
          const newCheckboxStates = answers.reduce((acc, answer) => {
            acc[answer.question_id - 1] = answer.answer === 1;
            return acc;
          }, {});

          setCheckboxStates((prevStates) => ({
            ...prevStates,
            ...newCheckboxStates,
          }));
        }
      } catch (error) {
        console.error("Error al obtener respuestas:", error);
      }
    };
    updateAnswers();
  }, [userData.roomIdSelected, userData.id]);

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleFirst = () => {
    setCurrentPage(0);
    setQuestionsView(false);
  };

  const handleLast = async () => {
    setCurrentPage(totalPages - 1);
    const response = await updateUserRoomMVP(
      userData.id,
      roomName,
      roomType,
      serviceTypeName,
      userData.roomIdSelected,
      checkboxStates
    );
    if (!response) {
      console.error("Error al crear la habitación");
      return;
    }
    setUserData((prev) => ({
      ...prev,
      refetch: !prev.refetch,
    }));

    setRoomName("");
    setRoomType("");
    setServiceTypeName("");
    navigate(`/admin/user/${userData.id}/rooms`);
  };

  const roomTypes = [
    { name: "BATHROOM" },
    { name: "BEDROOM" },
    { name: "CLOSET" },
    { name: "DINING_ROOM" },
    { name: "ENTRY" },
    { name: "FAMILY_ROOM" },
    { name: "FOYER" },
    { name: "GARAGE" },
    { name: "GENERAL" },
    { name: "HALLWAY" },
    { name: "KITCHEN" },
    { name: "LAUNDRY" },
    { name: "LIVING_ROOM" },
    { name: "MAIN_LEVEL" },
    { name: "OFFICE" },
    { name: "PACKOUT" },
    { name: "STAIRS" },
    { name: "STORAGE_AREA" },
    { name: "TOILET_ROOM" },
    { name: "VANITY_AREA" },
  ];

  const typeServices = [
    { id: "type_service_fire",
      name:"Fire"
    },
    { id: "type_service_packouts_packbacks_storage_contents_cleaning",
      name: "Packouts, Packbacks, Storage Contents Cleaning"
    },
    {
      id: "type_service_repairs_rebuild_construction",
      name: "Repairs, Rebuild, Construction"
    },
    {
      id: "type_service_water_mitigation_mold_remediation_ems",
      name: "Water Mitigation, Mold Remediation, EMS"
    },
    {
      id: "type_service_other",
      name: "Other"
    }
  ];

  const handleCreateRoom = async () => {
    if (roomName === "" || roomType === "" || serviceTypeName === "") {
      console.error(
        "Por favor, completa ambos campos antes de crear la habitación"
      );
      return;
    }
    setQuestionsView(true);
  };

  return (
    <AdminLayout>
      {!questionsView && (
        <section className={styles.projectsContainer}>
          <p>
            Hello, before we start, please write the name of the room for a
            quote.
          </p>
          <input
            type="text"
            name="RoomName"
            id=""
            placeholder="Room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <DropdownInput
            value={roomType}
            placeholder="Select the type of room"
            options={roomTypes}
            handleSelect={(selectedValue) => setRoomType(selectedValue)}
            isOpen={isOpenFirst}
            setIsOpen={setIsOpenFirst}
          />
          <DropdownInput
            value={serviceTypeName}
            placeholder="Select type service"
            options={typeServices}
            handleSelect={(selectedValue) => setServiceTypeName(selectedValue)}
            isOpen={isOpenSecond}
            setIsOpen={setIsOpenSecond}
          />
          <button
            onClick={() => {
              handleCreateRoom();
            }}
            className={styles.btnProject}
          >
            Edit Room
          </button>
        </section>
      )}
      {questionsView && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          handleFirst={handleFirst}
          handleLast={handleLast}
          data={data}
          startingIndex={startingIndex}
          paginatedData={paginatedData}
          checkboxStates={checkboxStates}
          handleCheckboxChange={(index) => {
            setCheckboxStates((prev) => ({
              ...prev,
              [index]: !prev[index],
            }));
          }}
        />
      )}
    </AdminLayout>
  );
}
