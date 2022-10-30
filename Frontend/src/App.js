import AddFarmer from "./pages/farmer/add/add"
import ViewAllEFarmers from "./pages/farmer/viewAll/viewAll";
import EditFarmer from "./pages/farmer/edit/edit";
import AddPlant from "./pages/plant/add/add";
import ViewAllPlants from "./pages/plant/viewAll/viewAll";
import EditPlant from "./pages/plant/edit/edit";
// import AddOtRecord from "./pages/plant/add/add";
// import ViewAllOtRecords from "./pages/plant/viewAll/viewAll";




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
            <Route index element={<AddFarmer />} />
            <Route path="Farmer" >
              <Route path="add" element={<AddFarmer />} />
              <Route path="viewall" element={<ViewAllEFarmers />} />
              <Route path="edit/:id" element={<EditFarmer />} />
            </Route>

            <Route path="plant">
              <Route path="add" element={<AddPlant />} />
              <Route path="viewall/" element={<ViewAllPlants />} />
              <Route path="edit/:id" element={<EditPlant />} />
            </Route>

            {/* <Route path="distribution">
              <Route path="add" element={<AddOtRecord />} />
              <Route path="viewall/" element={<ViewAllOtRecords />} />
            </Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
