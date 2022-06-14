import { useEffect } from "react";

import { Link } from "react-router-dom";
import { AiOutlineGooglePlus } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
import { Header } from "../Header";
import "./style.scss"


export const SignUp = () => {
  const notify = () => {
    toast.error('Passwords must be the same.', {
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
      <div className="ContainerSignUp">
        <div className="SignUp">
          <h1 className="Title">Sign Up</h1>
          
          <form >
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
          </form>
          
          <button onClick={notify}>
            Sign up
          </button>
          
          <button className="Chrome" >
            <AiOutlineGooglePlus className="ChromeIcon" size={25} /> Sign up with Google
          </button>
          
          <p>
            Already have an account? 
            <Link to={`/login`}>
              Login
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