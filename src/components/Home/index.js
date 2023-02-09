import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import Fade from "react-reveal/Fade";

import Header from "../Header";
import { Movies } from "./Movies";
import { TopRated } from "./TopRated";
import { Popular } from "./Popular";
import "./style.scss";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="home">
        <div className="home_container">
          <Fade bottom>
            <div className="home_container_fade">
              <h1 className="home_container_fade-title">Most Popular</h1>
            </div>
          </Fade>
          <Popular navigate={navigate} />
          <Fade bottom>
            <div className="home_container_fade">
              <h1 className="home_container_fade-title">New Movies</h1>
              <Link to={`/new-movies`}>
                <button className="home_container_fade-button">
                  See all
                  <IoIosArrowForward className="home_container_fade-button-icon" size={16} />
                </button>
              </Link>
            </div>
          </Fade>
          <div className="home_container_newmovie">
            <Movies navigate={navigate} />
          </div>
          <Fade bottom>
            <div className="home_container_fade">
              <h1 className="home_container_fade-title">Top Rated</h1>
              <Link to={`/top-rated`}>
                <button className="home_container_fade-button">
                  See all
                  <IoIosArrowForward className="home_container_fade-button-icon" size={16} />
                </button>
              </Link>
            </div>
          </Fade>
          <div className="home_container_ratedmovie">
            <TopRated navigate={navigate} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
