import { IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";

import "./style.scss";

export const SideBar = ({ sidebar, toggleSideBar }) => {
  
  
  return (
    <>
      <div className={sidebar ? "SideBarActive" : "SideBar"}>
        <button onClick={toggleSideBar} className="Close-Sidebar">
          <IoIosClose size={60} color="#FFF" />
        </button>
        <Link className="Link" to="/">
          <button className="Buttons-Sidebar">Home
          </button>
        </Link>
        <Link className="Link" to="/Categories">
          <button className="Buttons-Sidebar">Categories
          </button>
        </Link>
      </div>
      </>
    );
    
};