import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { setLogout } from "../../Redux/store";


const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const dispatchs = useDispatch();
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SUPPLIER PANNEL</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>

          <Link to="/profile" style={{ textDecoration: "none" }}>
            <li>
              <InsertDriveFileOutlinedIcon className="icon" />

              <span>Profile</span>
            </li>
          </Link>
          <p className="title">EVENT MANAGEMENT</p>
          <Link to="/items" style={{ textDecoration: "none" }}>
            <li>
              <CollectionsBookmarkOutlinedIcon className="icon" />

              <span>Items</span>
            </li>
          </Link>
          <Link to="/approved-orders" style={{ textDecoration: "none" }}>
            <li>
              <CollectionsBookmarkOutlinedIcon className="icon" />

              <span>Approved Bookings</span>
            </li>
          </Link>
          <Link to="/unapproved-orders" style={{ textDecoration: "none" }}>
            <li>
              <CollectionsBookmarkOutlinedIcon className="icon" />

              <span>UnApproved Books</span>
            </li>
          </Link>
          <Link to="/paid-orders" style={{ textDecoration: "none" }}>
            <li>
              <CollectionsBookmarkOutlinedIcon className="icon" />

              <span>Paid Orders</span>
            </li>
          </Link>
        
          <li>
            <ExitToAppOutlinedIcon className="icon" />
            <span onClick={() => dispatchs(setLogout())}>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
