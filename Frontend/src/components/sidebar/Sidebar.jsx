import "./sidebar.scss";
import AddIcon from "@mui/icons-material/Add";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PreviewIcon from "@mui/icons-material/Preview";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";

import { useContext } from "react";

const Sidebar = () => {
  return (
    <div className="hrSidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">
            {" "}
            <span className="name">Plant</span> Distribution
          </span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Farmer</p>
          <Link to="/farmer/add" style={{ textDecoration: "none" }}>
            <li>
              <AddIcon className="icon" />
              <span>Add</span>
            </li>
          </Link>
          <Link to="/farmer/viewall" style={{ textDecoration: "none" }}>
            <li>
              <PreviewIcon className="icon" />
              <span>View All</span>
            </li>
          </Link>

          <p className="title">Plant</p>
          <Link to="/plant/add" style={{ textDecoration: "none" }}>
            <li>
              <AddIcon className="icon" />
              <span>Add OT Type</span>
            </li>
          </Link>

          <Link to="/plant/viewall" style={{ textDecoration: "none" }}>
            <li>
              <PreviewIcon className="icon" />
              <span>View All OT Types</span>
            </li>
          </Link>

          <p className="title">Distribution</p>
          <Link to="/distribution/add" style={{ textDecoration: "none" }}>
            <li>
              <AddIcon className="icon" />
              <span>Add OT Record</span>
            </li>
          </Link>
          <Link to="/distribution/viewall" style={{ textDecoration: "none" }}>
            <li>
              <PreviewIcon className="icon" />
              <span>View All OT Records</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
