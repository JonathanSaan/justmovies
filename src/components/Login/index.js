import { useEffect } from "react";

import { Link } from "react-router-dom";
import { AiOutlineGooglePlus } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Header } from "../Header";
import "./style.scss"


export const Login = () => {
  const notify = () => {
    toast.error('Unable to log in with provided credentials.', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <Header />
      <div className="ContainerLogin">
        <div className="Login">
          <h1 className="Title">Login</h1>
          
          <form >
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
          </form>
          
          <button onClick={notify}>
            Login
          </button>
          
          <button className="Chrome" >
            <AiOutlineGooglePlus className="ChromeIcon" size={25} /> Login with Google
          </button>
          
          <p>
            Don't have an account? 
            <Link to={`/sign-up`}>
              Create new one
            </Link>
          </p>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
        />
      </div>
    </>
  );
};
          /*<div className="Checkbox">
            <input type="checkbox" />
            <label>Remember me </label>
          </div>*/ 
          
          
          