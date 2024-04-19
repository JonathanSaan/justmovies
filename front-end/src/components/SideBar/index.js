import { useState } from "react";

import { NavLink, Link } from "react-router-dom";

import { AiFillHome, AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import { FaBook } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { MdExpandMore, MdExpandLess, MdLogin, MdInstallMobile } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import Drawer from "@mui/material/Drawer";

import "./style.scss";

const SideBar = ({ category, profile, handleSignOut }) => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openList, setOpenList] = useState(true);

  
  const toggleDrawer = (newOpen) => () => {
    setOpenSideBar(newOpen);
  };

  const handleClickDropdown = () => {
    setOpenList(!openList);
  };

  return (
    <>
      <button className="burger" onClick={toggleDrawer(true)}>
        <RxHamburgerMenu size={40} />
      </button>
      
      <Drawer open={openSideBar} onClose={toggleDrawer(false)}>
        <button className="close" onClick={toggleDrawer(false)}>
          <IoIosClose size={40} />
        </button>
        
        {profile && (
          <div className="user">
            <h2 className="h2-sidebar">user</h2>
            <NavLink
              activeclassname="active"
              to={`/profile/${profile.username}`}
              className="Buttons-Sidebar"
            >
              <AiOutlineUser className="Icon" size={20} />
              <span className="Button-Label">profile</span>
            </NavLink>
            <NavLink
              activeclassname="active"
              to="/settings"
              className="Buttons-Sidebar"
            >
              <AiOutlineSetting className="Icon" size={20} />
              <span className="Button-Label">settings</span>
            </NavLink>
            <Link
              activeclassname="active"
              to="/"
              className="Buttons-Sidebar"
              onClick={handleSignOut}
            >
              <MdLogin className="Icon" size={20} />
              <span className="Button-Label">sign out</span>
            </Link>
          </div>
        )}
        
        <div>
          <h2 className="h2-sidebar">general</h2>
          <NavLink
            activeclassname="active"
            exact="true"
            to="/"
            className="Buttons-Sidebar"
          >
            <AiFillHome className="Icon" size={20} />
            <span className="Button-Label">home</span>
          </NavLink>
          {!profile && (
            <NavLink
              activeclassname="active"
              to="/sign-in"
              className="Buttons-Sidebar"
            >
              <MdLogin className="Icon" size={20} />
              <span className="Button-Label">sign in</span>
            </NavLink>
          )}
          <NavLink
            activeclassname="active"
            to="/apps"
            className="Buttons-Sidebar"
          >
            <MdInstallMobile size={20} className="Icon" />
            <span className="Button-Label">apps</span>
          </NavLink>
        </div>
        <button className="Dropdown-button" onClick={handleClickDropdown}>
          <div>
            <FaBook size={20} className="Icon" />
            <span>Genre</span>
          </div>
          <span>
            {openList ? <MdExpandLess size={22} className="Dropdown-button-icon" />  : <MdExpandMore size={22} className="Dropdown-button-icon" />}
          </span>
        </button>
      
        <Collapse in={openList} timeout="auto" unmountOnExit>
          <List component="div" className="category_list" disablePadding>
            {category && category.map((genre) => (
              <NavLink
                activeclassname="active"
                to={`/genre/${genre.id}/${genre.name.replaceAll(" ", "-").toLowerCase()}`}
                aria-label={genre.name}
                className="Buttons-Sidebar dropdown-link"
                key={genre.id}
              >
                <span className="Button-Label">
                  {genre.name}
                </span>
              </NavLink>
            ))}
          </List>
        </Collapse>
      </Drawer>
    </>
  );
};

export default SideBar;
