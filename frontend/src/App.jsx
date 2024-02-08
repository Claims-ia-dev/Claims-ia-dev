import Form from "../layout/formMeraki/form.jsx";
import Admin from "../layout/Admin/admin.jsx";
import { Routes, Route } from "react-router-dom";
import { useUserData } from "../context/UserContext.jsx";
import CreateRoomLayout from "../layout/createRoomLayout/createRoomLayout.jsx";
import EstimateLayout from "../layout/EstimateLayout/estimateLayout.jsx"
import EditRoomLayout from "../layout/EditRoomLayout/editRoomLayout.jsx"

export default function App() {

  const { userData } = useUserData();
  const adminRoute = `/admin/user/${userData.id}`
  const createRoom = `/admin/user/${userData.id}/room`
  const estimateRoute = `/admin/user/${userData.id}/estimate`
  const editRoom = `/admin/user/${userData.id}/room/edit`


  return (
    <Routes>
      <Route path="/" element={<Form/>} />
      <Route path={adminRoute} element={<Admin/>} />
      <Route path={createRoom} element={<CreateRoomLayout/>}></Route>
      <Route path={estimateRoute} element={<EstimateLayout/>}></Route>
      <Route path={editRoom} element={<EditRoomLayout/>}></Route>
    </Routes>
  );
}