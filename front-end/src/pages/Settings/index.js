import { useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  ThemeProvider,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Header from "../../components/Header";
import Notification from "../../utils/Notification";
import CustomTextField from "../../utils/CustomTextField";
import "./style.scss";

const Settings = () => {
  let navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const profileString = localStorage.getItem("user") || sessionStorage.getItem("user");
  const profile = profileString ? JSON.parse(profileString) : null;
  const id = profile ? profile.id : null;

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);

  const handleClickShowPassword = (event) => {
    if (event === "oldPassword") {
      return setShowOldPassword(!showOldPassword);
    }
    if (event === "newPassword") {
      return setShowNewPassword(!showNewPassword);
    }

    setShowRepeatedPassword(!showRepeatedPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeDescription = async (e) => {
    try {
      await axios.patch(`${process.env.REACT_APP_SERVER_BACK_URL}/profile/settings/description/${id}`, e, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Notification("success", "Description successfully updated!");
    } catch (err) {
      Notification("error", err.response.data.message);
    }
  };

  const handleChangePassword = async (e) => {
    try {
      await axios.patch(`${process.env.REACT_APP_SERVER_BACK_URL}/profile/settings/password/${id}`, e, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Notification("success", "Password successfully updated!");
      setTimeout(() => {
        navigate("/");
      }, 6500); 
    } catch (err) {
      Notification("error", err.response.data.message);
    }
  };

  const handleDeleteAccount = async () => {
    await axios.delete(`${process.env.REACT_APP_SERVER_BACK_URL}/profile/settings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.clear();
    sessionStorage.clear();

    navigate("/");
  };

  return (
    <HelmetProvider>
      <Header />
      <Helmet>
        <title>settings - justmovies</title>
      </Helmet>
      <div className="settings">
        <h1 className="settings-title">Settings</h1>
        <h2 className="settings-subtitle">Change description</h2>
        <form
          className="settings_form"
          onSubmit={handleSubmit(handleChangeDescription)}
        >
          <ThemeProvider theme={CustomTextField}>
            <TextField
              multiline={true}
              rows={3}
              type="text"
              className="settings_form-input description"
              label="Description"
              variant="outlined"
              fullWidth
              InputProps={{
                ...register("description")
              }}
            />
          </ThemeProvider>
          <button type="submit" className="settings_form-submit description">
            Change description
          </button>
        </form>
        <h2 className="settings-subtitle">Change password</h2>
        <form
          className="settings_form"
          onSubmit={handleSubmit(handleChangePassword)}
        >
          <ThemeProvider theme={CustomTextField}>
            <TextField
              type={showOldPassword ? "text" : "password"}
              className="settings_form-input"
              label="Old password"
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword("oldPassword")}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showOldPassword ? (
                        <MdOutlineVisibilityOff color="#d3d3d3f9" />
                      ) : (
                        <MdOutlineVisibility color="#d3d3d3f9" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                ...register("oldPassword")
              }}
            />
            <TextField
              type={showNewPassword ? "text" : "password"}
              className="settings_form-input"
              label="New password"
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword("newPassword")}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showNewPassword ? (
                        <MdOutlineVisibilityOff color="#d3d3d3f9" />
                      ) : (
                        <MdOutlineVisibility color="#d3d3d3f9" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                ...register("newPassword")
              }}
            />
            <TextField
              type={showRepeatedPassword ? "text" : "password"}
              className="settings_form-input"
              label="Repeat new password"
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword("repeatPassword")}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showRepeatedPassword ? (
                        <MdOutlineVisibilityOff color="#d3d3d3f9" />
                      ) : (
                        <MdOutlineVisibility color="#d3d3d3f9" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                ...register("repeatPassword")
              }}
            />
          </ThemeProvider>
          <button type="submit" className="settings_form-submit">
            Change password
          </button>
        </form>
        <h2 className="settings-subtitle">Delete account</h2>
        <form className="settings_form">
          <button
            type="submit"
            className="settings_form-submit delete"
            onClick={handleDeleteAccount}
          >
            Delete
          </button>
        </form>
        <ToastContainer />
      </div>
    </HelmetProvider>
  );
};

export default Settings;
