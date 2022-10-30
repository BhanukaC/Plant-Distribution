import AddEmployee from "./pages/farmer/add/add"
import ViewAllEmployees from "./pages/farmer/viewAll/viewAll";
import EditEmployee from "./pages/farmer/edit/edit";
import AddOtType from "./pages/distribution/add/add";
import ViewAllOtTypes from "./pages/distribution/viewAll/viewAll";
import EditOtType from "./pages/distribution/edit/edit";
import AddOtRecord from "./pages/plant/add/add";
import ViewAllOtRecords from "./pages/plant/viewAll/viewAll";




import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";





function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<AddEmployee />} />
            <Route path="farmer">
              <Route path="add" element={<AddEmployee />} />
              <Route path="viewall" element={<ViewAllEmployees />} />
              <Route path="edit/:id" element={<EditEmployee />} />
            </Route>

            <Route path="plant">
              <Route path="add" element={<AddOtType />} />
              <Route path="viewall/" element={<ViewAllOtTypes />} />
              <Route path="edit/:otID" element={<EditOtType />} />
            </Route>
            <Route path="distribution">
              <Route path="add" element={<AddOtRecord />} />
              <Route path="viewall/" element={<ViewAllOtRecords />} />

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
