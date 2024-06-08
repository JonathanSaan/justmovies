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
        <meta http-equiv="X-Frame-Options" content="SAMEORIGIN" />
        <link rel="canonical" href="https://justmovies.vercel.app/" />
        <meta name="keywords" content="movies, justmovies, a site to watch movies, a site to watch just movies" />
        <meta itemprop="image" content="/logo.webp" />
        <meta property="og:url" content="https://justmovies.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="justmovies" />
        <meta name="description" content="find and favorite movies on justmovies. Search, browse categories, and discover new releases. Create a personalized list and never miss a movie you love!" />
        <meta property="og:description" content="find and favorite movies on justmovies. Search, browse categories, and discover new releases. Create a personalized list and never miss a movie you love!" />
        <meta name="twitter:description" content="find and favorite movies on justmovies. Search, browse categories, and discover new releases. Create a personalized list and never miss a movie you love!" />
        <meta name="twitter:image" content="/logo.webp" />
        <meta name="twitter:image:alt" content="justmovies logo featuring a cassette tape icon and the site name 'justmovies'" />
        <meta property="og:image" content="/logo.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://justmovies.vercel.app" />
        <meta name="twitter:title" content="justmovies" />
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
