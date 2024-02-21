import Form from "../layout/formMeraki/form.jsx";
import { Routes, Route } from "react-router-dom";
import { useUserData } from "../context/UserContext.jsx";
import CreateRoomLayout from "../layout/createRoomLayout/createRoomLayout.jsx";
import EstimateLayout from "../layout/EstimateLayout/estimateLayout.jsx";
import EditRoomLayout from "../layout/EditRoomLayout/editRoomLayout.jsx";
import ProjectsContainer from "../layout/ProjectsListLayout/ProjectsListLayout.jsx";


export default function App() {
  const { userData } = useUserData();
  const createRoom = `/admin/user/${userData.id}/room`;
  const estimateRoute = `/admin/user/${userData.id}/estimate`;
  const editRoom = `/admin/user/${userData.id}/room/edit`;
  const projectList = `/admin/user/${userData.id}/rooms`;


  return (
    <>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path={createRoom} element={<CreateRoomLayout />}></Route>
        <Route path={estimateRoute} element={<EstimateLayout />}></Route>
        <Route path={editRoom} element={<EditRoomLayout />}></Route>
        <Route path={projectList} element={<ProjectsContainer />}></Route>
      </Routes>
    </>
  );
}
