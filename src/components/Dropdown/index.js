import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, Button, IconButton } from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";

import "./style.scss";


export const Dropdown = () => {
  
  const navigate = useNavigate();
  
  const options = [
    {
      id: 1,
      img: <BiLogIn size={20} />,
      aOption: "Login",
    },
    {
      id: 2,
      img: <AiOutlineUserAdd size={20} />,
      aOption: "Sign Up",
    }
  ];
  
  
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <IconButton className="IconButton" aria-label="user" {...bindTrigger(popupState)}>
            <AiOutlineUser size={30} className="IconUser" />
          </IconButton>
          
          <Menu {...bindMenu(popupState)}>
            {options.map((option) => (
              <MenuItem onClick={popupState.close}>
                {option.img}
                {option.aOption}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </PopupState>
  );
};
/*onClick={popupState.close}
    /*<div className="dropdown">
      <div className="dropdown-btn" onClick={(e) => SetIsActive(!isActive)}>
        <AiOutlineUser size={30} className="IconUser" />
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div onClick={navigate(`/${option.aOption.replaceAll(" ", "-").toLowerCase()}`)} key={option.id} className="dropdown-item">
              {option.img}
              {option.aOption}
            </div>
          ))}
        </div>
      )}
    </div*/