import { IoIosArrowForward } from "react-icons/io";

import Fade from "react-reveal/Fade";

import "./style.scss";

import { Header } from "../Header";
import { Movies } from "./Movies";
import { TopRated } from "./TopRated";
import { Popular } from "./Popular";


export const Home = () => {
  
  return (
    <>
      <Header/>
      <div className="Home" >
        <Fade bottom>
          <div className="Fade">
            <h1>Most Popular</h1>
          </div>
        </Fade>
        <div className="Popular" >
          <Popular/>
        </div>
       <Fade bottom>
          <div className="Fade">
            <h1>New Movies</h1>
            <button>
              <p>See all</p> 
              <IoIosArrowForward size={16} />
            </button>
          </div>
        </Fade>
        <div className="NewMovie">
          <Movies />
        </div>
       <Fade bottom>
          <div className="Fade">
            <h1>Top Rated </h1>
            <button>
              <p>See all</p> 
              <IoIosArrowForward size={16} />
            </button>
          </div>
        </Fade>
        <div className="TopRated">
          <TopRated />
        </div>
      </div>
    </>
  );
    
};