import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { AiOutlineGooglePlus } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Header } from "../Header";
import "./style.scss"


export const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  
  const HandleForm = () => {
    console.log(email)
    if (email === "" || password === "") {
      return (
        toast.error('Unable to log in with provided credentials.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          draggable: false,
        })
      );
    };
    
    return null;
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
            <input 
              type="email" 
              required
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input 
              type="password"
              required
              name="password"
              min="6"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
            />



          
          <button onClick={HandleForm}>
            Login
          </button>
          
          <button className="Chrome" >
            <AiOutlineGooglePlus className="ChromeIcon" size={25} /> Login with Google
          </button>
          </form>
          
          
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