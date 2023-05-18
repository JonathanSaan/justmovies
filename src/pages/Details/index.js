import { useState, useEffect } from "react";

import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { IoIosStar } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import APIKey from "../../mocks/api";
import { detailscarouselsetting } from "../../mocks/carouselsettings";
import { SkeletonMovieDetails } from "../../components/Skeleton";
import Header from "../../components/Header";
import "./style.scss";

const Details = () => {
  const { details } = useParams();

  const [detailsMovie, setDetailsMovie] = useState([]);
  const [yearMovie, setYearMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [trailer, setTrailer] = useState([]);

  const [characters, setCharacters] = useState([]);
  const [movieSimilar, setMovieSimilar] = useState([]);

  const [activeTab, setActiveTab] = useState("tab1");
  const handleTab = (index) => {
    setActiveTab(`tab${index}`);
  };

  const resetComponents = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setDetailsMovie([]);
    setGenres([]);
    setYearMovie([]);
    setTrailer([]);
    setCharacters([]);
    setMovieSimilar([]);
    setActiveTab("tab1");
  };

  useEffect(() => {
    const load = async () => {
      resetComponents();
      const respost = await axios.get(`https://api.themoviedb.org/3/movie/${details}?api_key=${APIKey}&language=en-US`);
      setDetailsMovie(respost.data);
      setGenres(respost.data.genres);
      setYearMovie(respost.data.release_date.slice(0, 4));

      const videos = await axios.get(`https://api.themoviedb.org/3/movie/${details}/videos?api_key=${APIKey}&language=en-US&append_to_response=videos`);

      if (videos.data && videos.data.results && videos.data.results[0]) {
        setTrailer(videos.data.results[0]);
      }

      const credits = await axios.get(`https://api.themoviedb.org/3/movie/${details}/credits?api_key=${APIKey}&language=en-US`);
      setCharacters(credits.data.cast);

      const dataSimilar = await axios.get(`https://api.themoviedb.org/3/movie/${details}/similar?api_key=${APIKey}&language=en-US&page=1`);
      setMovieSimilar(dataSimilar.data.results);
    };
    load();
  }, [details]);

  const imagePath = "https://image.tmdb.org/t/p/w500";
  const imageError =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHowX2RIOXDQtQ6EWW7zJ_RC8xhiSsXNihA&usqp=CAU";

  return (
    <>
      <Header />
      <Helmet>
        <title>
          {detailsMovie.title ? `${detailsMovie.title} - ` : ""}justmovies
        </title>
      </Helmet>
      <div className="details">
        <div
          className="details_backdrop"
          style={{
            backgroundImage: `url(${imagePath}${detailsMovie.backdrop_path})`,
          }}
        ></div>

        {Object.keys(detailsMovie).length > 0 ? (
          <div className="details_container">
            <div className="details_container_movie">
              <img
                loading="lazy"
                className="details_container_movie-image"
                src={detailsMovie.poster_path ? imagePath + detailsMovie.poster_path : imageError}
                alt={detailsMovie.title}
              />

              <span className="details_container_movie-details">
                <h1 className="details_container_movie-details-title">
                  {detailsMovie.title}
                </h1>
                <p className="details_container_movie-details-releasedate">
                  {yearMovie}
                </p>

                <hr />

                <div className="details_container_movie-details_votes">
                  <IoIosStar
                    className="details_container_movie-details_votes-icon"
                    size={15}
                    color="yellow"
                  />
                  <p className="details_container_movie-details_votes-number">
                    {detailsMovie.vote_average}
                  </p>
                </div>
                <hr />

                <div className="details_container_movie-details_genres">
                  {genres.map((genre) => (
                    <Link to={`/genre/${genre.id}/${genre.name.replaceAll(" ", "-").toLowerCase()}`}>
                      <button className="details_container_movie-details_genres-button">
                        {genre.name}
                      </button>
                    </Link>
                  ))}
                </div>
              </span>
            </div>

            <div className="details_container_movie-synopsis">
              <h2 className="details_container_movie-synopsis-paragraph">
                {detailsMovie.overview}
              </h2>
            </div>

            <div className="details_container_movie-containervideo">
              {trailer.key && (
                <iframe
                  className="details_container_movie-containervideo-video"
                  src={`https://youtube.com/embed/${trailer.key}`}
                  target="_parent"
                  frameborder="0"
                  title="trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              )}
            </div>

            <div className="AllTab">
              <Tabs defaultIndex={0} className="Tabs">
                <TabList className="TabList">
                  <Tab
                    onClick={() => handleTab(1)}
                    className={activeTab === "tab1" ? "active" : "false"}
                  >
                    Characters
                  </Tab>
                  <Tab
                    onClick={() => handleTab(2)}
                    className={activeTab === "tab2" ? "active" : "false"}
                  >
                    Similar
                  </Tab>
                </TabList>
                <TabPanel className="TabPanel">
                  <Slider {...detailscarouselsetting} className="carousel1">
                    {characters.map((Character) => (
                      <div className="item" key={Character.id}>
                        <img
                          loading="lazy"
                          src={Character.profile_path ? imagePath + Character.profile_path : imageError}
                          alt={Character.name}
                        />
                        <p>{Character.name}</p>
                      </div>
                    ))}
                  </Slider>
                </TabPanel>

                <TabPanel className="TabPanel">
                  <Slider {...detailscarouselsetting} className="carousel2">
                    {movieSimilar.map((similar) => (
                      <div className="item" key={similar.id}>
                        <Link to={`/${similar.id}`} draggable="false">
                          <img
                            src={similar.poster_path ? imagePath + similar.poster_path : imageError}
                            loading="lazy"
                            alt={similar.title}
                          />
                          <p>{similar.title}</p>
                        </Link>
                      </div>
                    ))}
                  </Slider>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        ) : (
          <SkeletonMovieDetails />
        )}
      </div>
    </>
  );
};

export default Details;