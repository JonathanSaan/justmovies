import { useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  ThemeProvider,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

import Header from "../../components/Header";
import Notification from "../../utils/Notification";
import CustomTextField from "../../utils/CustomTextField";
import "./style.scss";

const ResetPassword = () => {
  let navigate = useNavigate();
  const { id, token } = useParams();
  const { register, handleSubmit } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);

  const handleClickShowPassword = (event) => {
    if (event === "password") {
      return setShowPassword(!showPassword);
    }
    setShowRepeatedPassword(!showRepeatedPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const onSubmit = async (e) => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_BACK_URL }/reset-password/${id}/${token}`, e);

      Notification("success", "Password successfully updated!");
      setTimeout(() => {
        navigate("/sign-in");
      }, 6500); 
    } catch (err) {
      if (!token) {
        Notification("error", "Session expired. Please repeat the protocol.");
        setTimeout(() => {
          navigate("/recovery");
        }, 6500); 
      }

      Notification("error", err.response.data.message);
    }
  };

  return (
    <HelmetProvider>
      <Header />
      <Helmet>
        <title>Reset Password - justmovies</title>
      </Helmet>
      <div className="resetpassword">
        <div className="resetpassword_left">
          <img
            className="resetpassword_left-image"
            src="/cassette-tape.png"
            alt="cassette tape"
          />
        </div>
        <div className="resetpassword_right">
          <form className="resetpassword_right_form" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="resetpassword_right_form-title">Reset password</h1>
            <ThemeProvider theme={CustomTextField}>
              <TextField
                type={showPassword ? "text" : "password"}
                className="resetpassword_right_form-input"
                label="Password"
                variant="outlined"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword("password")}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <MdOutlineVisibilityOff color="#d3d3d3f9" />
                        ) : (
                          <MdOutlineVisibility color="#d3d3d3f9" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                  ...register("password"),
                }}
              />
              <TextField
                type={showRepeatedPassword ? "text" : "password"}
                className="resetpassword_right_form-input"
                label="Repeat Password"
                variant="outlined"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
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
                  ...register("repeatPassword"),
                }}
              />
            </ThemeProvider>

            <button type="submit" className="resetpassword_right_form-submit">
              Save Password
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </HelmetProvider>
  );
};

export default ResetPassword;
