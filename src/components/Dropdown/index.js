import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuItem, Button, IconButton } from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";



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
          
          <Menu style={{ marginTop: "10px" }} {...bindMenu(popupState)}>
            {options.map((option) => (
              <MenuItem component={Link} to={`/${option.aOption.replaceAll(" ", "-").toLowerCase()}`} >
                <span style={{ display: "flex", marginLeft: "-5px", marginRight: "15px"}} >
                  {option.img}
                  <p style={{ marginLeft: "5px"}}>
                    {option.aOption}
                  </p>
                </span>
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </PopupState>
  );
};