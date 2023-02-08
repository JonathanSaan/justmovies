import { useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { FaBook } from "react-icons/fa";

import "./style.scss";

const SideBar = ({ sidebar, toggleSideBar }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={sidebar ? "SideBarActive" : "SideBar"}>
        <button onClick={toggleSideBar} className="Close-Sidebar">
          <IoIosClose size={190} color="#FFF" />
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="Buttons-Sidebar"
        >
          <AiFillHome className="IconHome" size={20} />
          Home
        </button>
        <button
          onClick={() => {
            navigate("/genre");
          }}
          className="Buttons-Sidebar"
        >
          <FaBook size={20} className="IconGenre" />
          Genre
        </button>
      </div>
      <div className={sidebar && "ShadowActive"} onClick={toggleSideBar}></div>
    </>
  );
};

export default SideBar;