import { useState } from "react";

import { Helmet, HelmetProvider } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ThemeProvider from "@mui/material";
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { ToastContainer } from "react-toastify";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

import Header from "../../components/Header";
import Notification from "../../utils/Notification";
import CustomTextField from "../../utils/CustomTextField";
import "./style.scss";

const SignUp = () => {
  const navigate = useNavigate();
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
      await axios.post(`${process.env.REACT_APP_SERVER_BACK_URL}/sign-up`, e);
      
      navigate("/sign-in");
    } catch (err) {
      Notification("error", err.response.data.message);
    }
  };

  return (
    <HelmetProvider>
      <Header />
      <Helmet>
        <title>sign up - justmovies</title>
      </Helmet>
      <div className="signup">
        <div className="signup_left">
          <img
            className="signup_left-image"
            src="/cassette-tape.png"
            alt="cassette tape"
          />
        </div>
        <div className="signup_right">
          <form className="signup_right_form" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="signup_right_form-title">Sign up</h1>
            <ThemeProvider theme={CustomTextField}>
              <TextField
                type="text"
                className="signup_right_form-input"
                label="Username"
                variant="outlined"
                fullWidth
                InputProps={{
                  ...register("username"),
                }}
              />
              <TextField
                type="email"
                className="signup_right_form-input"
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
                className="signup_right_form-input"
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
                className="signup_right_form-input"
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

            <button type="submit" className="signup_right_form-submit">
              Sign up
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <Link to="/sign-in" className="signup_right-link">
              Sign in
            </Link>
          </p>
        </div>
        <ToastContainer />
      </div>
    </HelmetProvider>
  );
};

export default SignUp;
