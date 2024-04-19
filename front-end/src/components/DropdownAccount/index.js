import { useState } from "react";

import { Link } from "react-router-dom";

import { AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { MdLogin } from "react-icons/md";

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";

import "./style.scss";

const DropdownAccount = ({ profile, handleSignOut }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <button className="dropdown-button" onClick={handleClick} title="User Profile">
          <HiOutlineUserCircle size={35} color="#f3f3f3" />
        </button>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "#323537",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {profile ? (
          <>
            <Link to={`/profile/${profile.username}`}>
              <AiOutlineUser className="dropdown-icon" size={30} />
              <span>profile</span>
            </Link>

            <Link to="/settings">
              <AiOutlineSetting className="dropdown-icon" size={30} />
              <span>settings</span>
            </Link>

            <Divider />
            <Link to="/" onClick={handleSignOut}>
              <MdLogin className="dropdown-icon" size={30} />
              <span>sign out</span>
            </Link>
          </>
        ) : (
          <Link to="/sign-in">
            <MdLogin className="dropdown-icon" size={30} />
            <span>sign in</span>
          </Link>
        )}
      </Menu>
    </>
  );
};

export default DropdownAccount;
