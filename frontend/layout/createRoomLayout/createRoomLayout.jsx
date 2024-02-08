import { useState } from 'react';
import { useUserData } from '../../context/UserContext';
import styles from './createRoomLayout.module.css';
import { setUserRoomMVP } from '../../controller/userOperation';
import Navbar from '../../components/navbar/navbar';
import { useNavigate } from 'react-router-dom';
import data from "../../public/questions.json"
import { FaChevronDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";




export default function CreateProjectContainer () {

    const [roomName, setRoomName] = useState("");
    const [roomType, setRoomType] = useState("");
    const [questionsView, setQuestionsView] = useState(false)

    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(data.length / pageSize);
    const startingIndex = currentPage * pageSize;

    const paginatedData = data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

    const [checkboxStates, setCheckboxStates] = useState(
      Object.fromEntries(
        data.map((_, index) => [index, false])
      )
    );

    const { userData, setUserData } = useUserData();
    const navigate = useNavigate();


    const [isOpen, setIsOpen] = useState(false);


    const handleCheckboxChange = (index) => {
      setCheckboxStates((prevStates) => ({
        ...prevStates,
        [index]: !prevStates[index],
      }));
    };

    const handlePrevious = () => {
      setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
      setCurrentPage(currentPage + 1);
    };

    const handleFirst =  () => {
      setCurrentPage(0);
      userData.rooms.length > 0
        ? navigate(`/admin/user/${userData.id}`)
        : setQuestionsView(false);
    };

    const handleLast = async () => {
      console.log(checkboxStates)
      setCurrentPage(totalPages - 1);
      const response = await setUserRoomMVP(userData.id, roomName, roomType, checkboxStates);
      // const response = await setUserAnswerRoomMVP(userData.id, checkboxStates, 60)
      console.log('response', response);

      setUserData((prev) => ({
        ...prev,
          refetch: !prev.refetch,
      }));
      setRoomName("");
      setRoomType("");
      navigate(`/admin/user/${userData.id}`)
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
      { name: "VANITY_AREA" }
    ];

    const handleCreateRoom = async () => {
      if (roomName === "" || roomType === "") {
        console.error('Por favor, completa ambos campos antes de crear la habitación');
        return
      }
        setQuestionsView(true);
    }
    return (
      <div className={styles.container}>
      <Navbar/>
      {!questionsView && (
        <section className={styles.projectsContainer}>
          <p>Hello, before we start, please write the name of the room for a quote.</p>
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
          />          <button onClick={()=>{handleCreateRoom()}} className={styles.btnProject}>Create Room</button>
        </section>
      )}
      {questionsView && (
        <>
          <section className={styles.questionsContainer}>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Questions</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={index}>
                    <td>{startingIndex + index + 1}</td>
                    <td>{item.description}</td>
                    <td>
                      <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={checkboxStates[startingIndex + index] || false}
                        onChange={() => handleCheckboxChange(startingIndex + index)} />
                        <span className={styles.slider}></span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <div className={styles.buttonsContainer}>
            <button onClick={currentPage === 0 ? handleFirst : handlePrevious}>
              {currentPage === 0 ? 'Cancelar' : 'Anterior'}
            </button>
            <button onClick={currentPage === totalPages - 1 ? handleLast : handleNext}>
              {currentPage === totalPages - 1 ? 'Finalizar' : 'Siguiente'}
            </button>
          </div>
        </>
      )}
      </div>
    );
  }



  const DropdownInput = ({ value, placeholder, options, handleSelect, isOpen, setIsOpen }) => (
    <div className={styles.dropdownInput}>
      <div className={styles.selectedValue}>
        {value ? value : placeholder}
        {isOpen
          ? <IoClose onClick={() => setIsOpen(!isOpen)} fontSize={"2em"} className={styles.iconPosition}/>
          : <FaChevronDown onClick={() => setIsOpen(!isOpen)} fontSize={"2em"} className={styles.iconPosition}/>
        }
      </div>
      {isOpen && (
        <div className={`${styles.dropdownOptions} ${styles.dropdownOptionsOpen}`}>
          {options.map((option, index) => (
            <div key={index} onClick={() => handleSelect(option.name)} className={styles.dropdownOption}>
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );