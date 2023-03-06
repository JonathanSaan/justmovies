import { useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { FaBook } from "react-icons/fa";
import { slide as Menu } from "react-burger-menu";

import "./style.scss";

const SideBar = ({ sidebar, toggleSideBar }) => {
  const navigate = useNavigate();

  return (
    <>
      <Menu left isOpen={toggleSideBar} customBurgerIcon={<IoMenu className="bm-burger-bars" size={75}/>}>
        <a onClick={() => {navigate("/")}} className="Buttons-Sidebar">
          <AiFillHome className="Icon" size={20} />
          Home
        </a>
        <a onClick={() => {navigate("/genre")}} className="Buttons-Sidebar">
          <FaBook size={20} className="Icon" />
          Genre
        </a>
      </Menu>
    </>
  );
};

export default SideBar;