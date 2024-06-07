import { useState } from "react";

import { Helmet, HelmetProvider } from "react-helmet-async";
import { useForm } from "react-hook-form";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import TextField from "@mui/material/TextField";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import Notification from "../../utils/Notification";
import CustomTextField from "../../utils/CustomTextField";
import LoadingButton from "../../components/LoadingButton";
import "./style.scss";

const Recovery = () => { 
  const { register, handleSubmit } = useForm();
  const [loadingButton, setLoadingButton] = useState(false);
  
  const onSubmit = async (e) => {
    try {
      setLoadingButton(true)
      await axios.post(`${process.env.REACT_APP_SERVER_BACK_URL}/recovery`, e);
      
      setLoadingButton(false)
      Notification("success", "Password reset email sent");
    } catch (err) {
      setLoadingButton(false)
      Notification("error", err.response.data.message);
    }
  };
  
  return (
    <HelmetProvider>
      <Header />
      <Helmet>
        <title>Recovery - justmovies</title>
        <meta name="description" content="Forgot your password? No worries. Enter your email to receive a password reset link." />
        <meta name="keywords" content="password reset, forgot password, account recovery" />
      </Helmet>
      <div className="recovery">
        <div className="recovery_left">
          <img
            className="recovery_left-backimage"
            src="/movie-theater.webp"
            alt="movie theater"
          />
          <img
            className="recovery_left-image"
            src="/cassette-tape.webp"
            alt="cassette tape"
          />
        </div>
        <main className="recovery_right">
          <div className="recovery_right_container">
      	    <form className="recovery_right_form" onSubmit={handleSubmit(onSubmit)}>
      	      <h1 className="recovery_right_form-title">Recovery</h1>
      	      <ThemeProvider theme={CustomTextField}>
                <TextField
                  type="email"
                  className="recovery_right_form-input"
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
              </ThemeProvider>
              <LoadingButton styleButton="recovery_right_form-submit" loading={loadingButton} message="Email me some help" />
      	    </form>
            <Link to="/sign-in" className="recovery_right-link">
              Back to Sign in
            </Link>
          </div>
        </main>
        <ToastContainer />
      </div>
    </HelmetProvider>
  )
}

export default Recovery;
