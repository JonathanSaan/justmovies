import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import Fade from "react-reveal/Fade";

import "./style.scss";

import { Header } from "../Header";
import { Movies } from "./Movies";
import { TopRated } from "./TopRated";
import { Popular } from "./Popular";


export const Home = () => {
  
  const navigate = useNavigate();
  
  return (
    <>
      <Header/>
      <div className="Home" >
        <div className="ContainerHome" >
          <Fade bottom>
            <div className="Fade">
              <h1>Most Popular</h1>
            </div>
          </Fade>
          <div className="Popular" >
            <Popular navigate={navigate} />
          </div>
         <Fade bottom>
            <div className="Fade">
              <h1>New Movies</h1>
              <Link to={`/NewMovies`}>
                <button>
                  <p>See all</p> 
                  <IoIosArrowForward size={16} />
                </button>
              </Link>
            </div>
          </Fade>
          <div className="NewMovie">
            <Movies navigate={navigate} />
          </div>
         <Fade bottom>
            <div className="Fade">
              <h1>Top Rated </h1>
              <Link to={`/TopRated`}>
                <button>
                  <p>See all</p> 
                  <IoIosArrowForward size={16} />
                </button>
              </Link>
            </div>
          </Fade>
          <div className="TopRated">
            <TopRated navigate={navigate} />
          </div>
        </div>
      </div>
    </>
  );
    
};