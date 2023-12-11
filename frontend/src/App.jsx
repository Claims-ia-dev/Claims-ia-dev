import Form from "../layout/formMeraki/form.jsx";
// import Admin from "../layout/Admin/admin.jsx";
import { Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Form/>} />
      {/* <Route path="/admin" element={<Admin/>} /> */}
    </Routes>
  );
}