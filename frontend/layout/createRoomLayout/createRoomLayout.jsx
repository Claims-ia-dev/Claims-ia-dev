import { useState } from "react";
import { useUserData } from "../../context/UserContext";
import styles from "./createRoomLayout.module.css";
import { setUserRoomMVP } from "../../controller/userOperation";
import { useNavigate } from "react-router-dom";
import data from "../../public/questions.json";
import DropdownInput from "../../components/inputs/dropDownInput/dropDownInput.jsx";
import AdminLayout from "../Admin/admin.jsx";
import TablePagination from "../../components/tablePagination/tablePagination.jsx";

export default function CreateProjectContainer() {
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [questionsView, setQuestionsView] = useState(false);

  const pageSize = 15;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(data.length / pageSize);
  const startingIndex = currentPage * pageSize;

  const paginatedData = data.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const [checkboxStates, setCheckboxStates] = useState(
    Object.fromEntries(data.map((_, index) => [index, false]))
  );

  const { userData, setUserData } = useUserData();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleFirst = () => {
    setCurrentPage(0);
    setQuestionsView(false);
    setRoomName("");
    setRoomType("");
  };

  const handleLast = async () => {
    setCurrentPage(totalPages - 1);
    const response = await setUserRoomMVP(
      userData.id,
      roomName,
      roomType,
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

  const handleCreateRoom = async () => {
    if (roomName === "" || roomType === "") {
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
        <section onClick={() => { isOpen && setIsOpen(false);}} className={styles.projectsContainer}>
          <p> Hello, before we start, please write the name of the room for a quote.</p>
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
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <button
            onClick={() => {handleCreateRoom();}}
            className={roomName && roomType ? styles.btnProject : styles.btnProjectDeny}>
            Create Room
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
