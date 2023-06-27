import { Helmet, HelmetProvider } from "react-helmet-async";
import { useForm } from "react-hook-form";
import ThemeProvider from "@mui/material";
import TextField from "@mui/material/TextField";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import Notification from "../../utils/Notification";
import CustomTextField from "../../utils/CustomTextField";
import "./style.scss";

const Recovery = () => { 
  const { register, handleSubmit } = useForm();

  const onSubmit = async (e) => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_BACK_URL}/recovery`, e);
      
      Notification("success", "Password reset email sent");
    } catch (err) {
      Notification("error", err.response.data.message);
    }
  };
  
  return (
    <HelmetProvider>
      <Header />
      <Helmet>
        <title>Recovery - justmovies</title>
      </Helmet>
      <div className="recovery">
        <div className="recovery_left">
          <img
            className="recovery_left-image"
            src="/cassette-tape.png"
            alt="cassette tape"
          />
        </div>
        <div className="recovery_right">
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
            <button type="submit" className="recovery_right_form-submit">
              Email me some help
            </button>
      	  </form>
          <Link to="/sign-in" className="recovery_right-link">
            Back to Sign in
          </Link>
        </div>
        <ToastContainer />
      </div>
    </HelmetProvider>
  )
}

export default Recovery;
