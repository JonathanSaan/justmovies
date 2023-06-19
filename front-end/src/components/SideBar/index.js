import { NavLink, Link } from "react-router-dom";

import { IoMenu } from "react-icons/io5";
import { AiFillHome, AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import { FaBook } from "react-icons/fa";
import { MdLogin, MdInstallMobile } from "react-icons/md";
import { slide as Menu } from "react-burger-menu";

import "./style.scss";

const SideBar = () => {
  const profileString = localStorage.getItem("user") || sessionStorage.getItem("user");
  const profile = profileString ? JSON.parse(profileString) : null;

  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <Menu
      left
      isOpen={false}
      pageWrapId={"page-wrap"}
      outerContainerId={"outer-container"}
      customBurgerIcon={<IoMenu className="bm-burger-bars" size={75} />}
    >
      <div>
        <h1 className="h1-sidebar">general</h1>
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
        <NavLink
          activeclassname="active"
          to="/genre"
          className="Buttons-Sidebar"
        >
          <FaBook size={20} className="Icon" />
          <span className="Button-Label">genre</span>
        </NavLink>
      </div>
      {profile ? (
        <div className="user">
          <h1 className="h1-sidebar">user</h1>
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
      ) : null}
    </Menu>
  );
};

export default SideBar;
