import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { FaBook } from "react-icons/fa";
import { slide as Menu } from "react-burger-menu";

import "./style.scss";

const SideBar = () => {
  return (
    <Menu left isOpen={false} pageWrapId={"page-wrap"} outerContainerId={"outer-container"} customBurgerIcon={<IoMenu className="bm-burger-bars" size={75}/>}>
      <Link to="/" className="Buttons-Sidebar">
        <AiFillHome className="Icon" size={20} />
        Home
      </Link>
      <Link to="/genre" className="Buttons-Sidebar">
        <FaBook size={20} className="Icon" />
        Genre
      </Link>
    </Menu>
  );
};

export default SideBar;