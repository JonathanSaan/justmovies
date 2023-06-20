import { useState } from "react";

import { Helmet, HelmetProvider } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  ThemeProvider,
  TextField,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

import Header from "../../components/Header";
import Notification from "../../utils/Notification";
import CustomTextField from "../../utils/CustomTextField";
import "./style.scss";

const SignIn = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [rememberMe, setRememberMe] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };
  
  const onSubmit = async (e) => {
    try {
      const response = await axios.post(`${process.env.SERVER_BACK_URL}/sign-in`, e);
      const { token, user } = response.data;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));

      if (rememberMe) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        sessionStorage.clear();
      }

      navigate("/");
    } catch (err) {
      Notification("error", err.response.data.message);
    }
  };

  return (
    <HelmetProvider>
      <Header />
      <Helmet>
        <title>sign in - justmovies</title>
      </Helmet>
      <div className="signin">
        <div className="signin_left">
          <img
            className="signin_left-image"
            src="/cassette-tape.png"
            alt="cassette tape"
          />
        </div>
        <div className="signin_right">
          <form className="signin_right_form" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="signin_right_form-title">Sign in</h1>
            <ThemeProvider theme={CustomTextField}>
              <TextField
                type="email"
                className="signin_right_form-input"
                label="Email"
                variant="outlined"
                fullWidth
                InputProps={{
                  ...register("email", {
                    pattern:
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  }),
                }}
              />
              <TextField
                type={showPassword ? "text" : "password"}
                className="signin_right_form-input"
                label="Password"
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
            </ThemeProvider>

            <FormControlLabel
              className="signin_right_form-checkbox"
              control={
                <Checkbox
                  color="default"
                  style={{ color: "#808080" }}
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
              }
              label="Remember me"
            />

            <button type="submit" className="signin_right_form-submit">
              Sign in
            </button>
          </form>
          <p>
            Do not have an account?{" "}
            <Link to="/sign-up" className="signin_right-link">
              Create new one
            </Link>
          </p>
          <p>
            <Link to="/recovery" className="signin_right-link">
              Forgot password?
            </Link>
          </p>
        </div>
        <ToastContainer />
      </div>
    </HelmetProvider>
  );
};

export default SignIn;