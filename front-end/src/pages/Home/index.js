import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Fade from "react-reveal/Fade";
import { IoIosArrowForward } from "react-icons/io";

import Header from "../../components/Header";
import Footer from "../../components/Footer"; 
import { Movies } from "./Movies";
import { TopRated } from "./TopRated";
import { Popular } from "./Popular";
import "./style.scss";

const Home = () => {
  return (
    <HelmetProvider>
      <Header />
      <Helmet>
        <title>justmovies</title>
      </Helmet>
      <div className="home">
        <div className="home_container">
          <Fade bottom>
            <div className="home_container_fade">
              <h1 className="home_container_fade-title">Most Popular</h1>
            </div>
          </Fade>
          <Popular />
          <Fade bottom>
            <div className="home_container_fade">
              <h1 className="home_container_fade-title">New Movies</h1>
              <Link to={`/new-movies`}>
                <button className="home_container_fade-button">
                  See all
                  <IoIosArrowForward className="home_container_fade-button-icon" size={20} />
                </button>
              </Link>
            </div>
          </Fade>
          <div className="home_container_newmovie">
            <Movies />
          </div>
          <Fade bottom>
            <div className="home_container_fade">
              <h1 className="home_container_fade-title">Top Rated</h1>
              <Link to={`/top-rated`}>
                <button className="home_container_fade-button">
                  See all
                  <IoIosArrowForward className="home_container_fade-button-icon" size={20} />
                </button>
              </Link>
            </div>
          </Fade>
          <div className="home_container_ratedmovie">
            <TopRated />
          </div>
        </div>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Home;
