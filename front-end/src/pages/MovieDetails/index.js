import { useState, useEffect } from "react";

import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { IoIosStar } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { ToastContainer } from "react-toastify";

import APIKey from "../../mocks/api";
import resetComponents from "../../utils/ResetComponents";
import Notification from "../../utils/Notification";
import { detailscarouselsetting } from "../../mocks/carouselsettings";
import { SkeletonMovieDetails } from "../../components/Skeleton";
import Header from "../../components/Header";
import "./style.scss";

const MovieDetails = () => {
  const { details } = useParams();
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const profileString = localStorage.getItem("user") || sessionStorage.getItem("user");
  const profile = profileString ? JSON.parse(profileString) : null;
  const id = profile ? profile.id : null;

  const [loading, setLoading] = useState(true);
  const [detailsMovie, setDetailsMovie] = useState({});
  const [favorited, setFavorited] = useState(false);
  const [yearMovie, setYearMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [movieSimilar, setMovieSimilar] = useState([]);

  const [activeTab, setActiveTab] = useState("tab1");
  const handleTab = (index) => {
    setActiveTab(`tab${index}`);
  };
  
  const handleFavorite = async (e) => {
    e.preventDefault();

    if(favorited) {
      try {
        await axios.delete(`${process.env.REACT_APP_SERVER_BACK_URL}/movies/removeFavorite/${detailsMovie.id}`, {
          data: {
            userFrom: id,
            movieId: detailsMovie.id,
            movieTitle: detailsMovie.title,
            movieImage: imagePath + detailsMovie.poster_path,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Notification("success", "Movie removed from favorites");
        setFavorited(!favorited);
      } catch (err) {
        Notification("error", err.response.data.message);
      }
      return;
    }
    
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_BACK_URL}/movies/addFavorite/${detailsMovie.id}`,
      {
        userFrom: id,
        movieId: detailsMovie.id,
        movieTitle: detailsMovie.title,
        movieImage: imagePath + detailsMovie.poster_path,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Notification("success", "Movie added to favorites");
      setFavorited(!favorited);
    } catch (err) {
      Notification("error", err.response.data.message);
    }
  };
  
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const respost = await axios.get(`https://api.themoviedb.org/3/movie/${details}?api_key=${APIKey}&language=en-US`);
      setDetailsMovie(respost.data);
      setGenres(respost.data.genres);
      setYearMovie(respost.data.release_date.slice(0, 4));
      
      const videos = await axios.get(`https://api.themoviedb.org/3/movie/${details}/videos?api_key=${APIKey}&language=en-US&append_to_response=videos`);
  
      if (videos.data?.results?.length) {
        setTrailer(videos.data.results[0]);
      }
  
      const credits = await axios.get(`https://api.themoviedb.org/3/movie/${details}/credits?api_key=${APIKey}&language=en-US`);
      setCharacters(credits.data.cast);
  
      const dataSimilar = await axios.get(`https://api.themoviedb.org/3/movie/${details}/similar?api_key=${APIKey}&language=en-US&page=1`);
      setMovieSimilar(dataSimilar.data.results);
      setLoading(false);
    };

    resetComponents(
      setDetailsMovie,
      setGenres,
      setYearMovie,
      setTrailer,
      setCharacters,
      setMovieSimilar,
      setActiveTab("tab1")
    );

    load();
  }, [details]);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (profile && detailsMovie.id) {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_BACK_URL}/profile/${profile.username}`);
        const favorites = response.data.user.favorites;
        const isFavorited = favorites.some((movie) => parseInt(movie.movieId) === parseInt(detailsMovie.id));
        setFavorited(isFavorited);
      }
    }

    if (profile && detailsMovie.id) {
      checkFavoriteStatus();
    }
  }, [detailsMovie, profile]);

  const imagePath = "https://image.tmdb.org/t/p/w500";
  const imageError = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHowX2RIOXDQtQ6EWW7zJ_RC8xhiSsXNihA&usqp=CAU";

  return (
    <HelmetProvider>
      <Header />
      <Helmet>
        <title>{detailsMovie.title ? `${detailsMovie.title} - ` : ""}justmovies</title>
        <meta name="description" content={detailsMovie.overview} />
        <meta name="keywords" content={`movie, ${detailsMovie.title}, ${detailsMovie.genres.join(", ")}, trailer, characters, similar movies`} />
        <meta property="og:image" content={imagePath + detailsMovie.poster_path} />
      </Helmet>
      <div className="details">
        {loading ? (
          <SkeletonMovieDetails />
        ) : Object.keys(detailsMovie).length > 0 ? (
          <>
            <div
              className="details_backdrop"
              style={{
                backgroundImage: `url(${imagePath}${detailsMovie.backdrop_path})`,
              }}
            ></div>
            <div className="details_container" key={detailsMovie.id}>
              <div className="details_container_movie">
                <img
                  className="details_container_movie-image"
                  width="640"
                  height="480"
                  src={
                    detailsMovie.poster_path ? imagePath + detailsMovie.poster_path : imageError
                  }
                  alt={
                    detailsMovie.title ? detailsMovie.title : "details about movie"
                  }
                />

                <span className="details_container_movie-details">
                  <h1 className="details_container_movie-details-title">
                    {detailsMovie.title}
                  </h1>
                  <p className="details_container_movie-details-releasedate">
                    {yearMovie}
                  </p>

                  <hr />
                  <span>
                    <div className="details_container_movie-details_votes">
                      <IoIosStar
                        className="details_container_movie-details_votes-icon"
                        size={15}
                        color="yellow"
                      />
                      <p>
                        {detailsMovie.vote_average.toFixed(1)}
                      </p>
                    </div>
                    <button onClick={handleFavorite} className="details_container_movie-details-favorite">
                      {favorited ? <AiFillHeart size={25} color="#FF0043" /> : <AiFillHeart size={25} color="#808080" />}
                    </button>
                  </span>

                  <hr />

                  <div className="details_container_movie-details_genres">
                    {genres.map((genre) => (
                      <Link
                        to={`/genre/${genre.id}/${genre.name.replaceAll(" ", "-").toLowerCase()}`}
                        key={genre.id}
                      >
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
                    type="text/html"
                    src={`https://youtube.com/embed/${trailer.key}`}
                    target="_parent"
                    title="trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
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
                            width="640"
                            height="480"
                            src={
                              Character.profile_path ? imagePath + Character.profile_path : imageError
                            }
                            alt={
                              Character.name ? Character.name : "a character"
                            }
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
                          <Link
                            to={`/movies/${similar.id}`}
                            aria-label={similar.title}
                            draggable="false"
                          >
                            <img
                              loading="lazy"
                              height="680"
                              width="440"
                              src={
                                similar.poster_path ? imagePath + similar.poster_path : imageError
                              }
                              alt={
                                similar.title ? similar.title : "a similar movie"
                              }
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
          </>
        ) : (
          <div className="details_noFound">
            <h1>Movie no found.</h1>
          </div>
        )}
        <ToastContainer />
      </div>
    </HelmetProvider>
  );
};

export default MovieDetails;
