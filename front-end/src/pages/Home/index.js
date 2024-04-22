import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { IoIosArrowForward } from "react-icons/io";

import Header from "../../components/Header";
import Footer from "../../components/Footer"; 
import { Movies } from "./Movies";
import { TopRated } from "./TopRated";
import { Popular } from "./Popular";
import "./style.scss";

const Home = () => {
  window.scrollTo(0, 0);
  
  return (
    <HelmetProvider>
      <Header />
      <Helmet>
        <title>justmovies</title>
      </Helmet>
      <main className="home">
        <div className="home_container">
          <Popular />
          <div className="home_container_fade">
            <h2 className="home_container_fade-title">New Movies</h2>
            <Link to={`/new-movies`}>
              <button className="home_container_fade-button">
                see all
                <IoIosArrowForward className="home_container_fade-button-icon" size={20} />
              </button>
            </Link>
          </div>
          <div className="home_container_newmovie">
            <Movies />
          </div>
          <div className="home_container_fade">
            <h2 className="home_container_fade-title">Top Rated</h2>
            <Link to={`/top-rated`}>
              <button className="home_container_fade-button">
                see all
                <IoIosArrowForward className="home_container_fade-button-icon" size={20} />
              </button>
            </Link>
          </div>
          <div className="home_container_ratedmovie">
            <TopRated />
          </div>
        </div>
      </main>
      <Footer />
    </HelmetProvider>
  );
};

export default Home;
