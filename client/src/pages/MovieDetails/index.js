import { useState, useEffect } from "react";

import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { IoIosStar } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";
import { Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ToastContainer } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import APIKey from "../../mocks/api";
import breakpoints from "../../mocks/breakpoints_carousel";
import resetComponents from "../../utils/ResetComponents";
import Notification from "../../utils/Notification";
import { SkeletonMovieDetails } from "../../components/Skeleton";
import Header from "../../components/Header";
import LoadingButton from "../../components/LoadingButton";
import "./style.scss";

const MovieDetails = () => {
  const { details } = useParams();
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const profileString = localStorage.getItem("user") || sessionStorage.getItem("user");
  const profile = profileString ? JSON.parse(profileString) : null;
  const id = profile ? profile.id : null;

  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [detailsMovie, setDetailsMovie] = useState({});
  const [favorited, setFavorited] = useState(false);
  const [yearMovie, setYearMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [movieSimilar, setMovieSimilar] = useState([]);

  const [activeTab, setActiveTab] = useState("1");
  const handleTab = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleFavorite = async (e) => {
    e.preventDefault();
    setLoadingButton(true)

    if(favorited) {
      try {
        setLoadingButton(true)
        await axios.delete(`${process.env.REACT_APP_SERVER_BACK_URL}/movies/removeFavorite/${detailsMovie.id}`, {
          data: {
            userId: id,
            username: profile.username,
            movieTitle: detailsMovie.title,
            movieImage: imagePath + detailsMovie.poster_path,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoadingButton(false)
        Notification("success", "Movie removed from favorites");
        setFavorited(false);
      } catch (err) {
        setLoadingButton(false)
        Notification("error", err.response.data.message);
      }
      return;
    }
    
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_BACK_URL}/movies/addFavorite/${detailsMovie.id}`,
      {
        userId: id,
        username: profile.username,
        movieTitle: detailsMovie.title,
        movieImage: imagePath + detailsMovie.poster_path,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoadingButton(false)
      Notification("success", "Movie added to favorites");
      setFavorited(true);
    } catch (err) {
      setLoadingButton(false)
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
      
      const videos = await axios.get(`https://api.themoviedb.org/3/movie/${details}/videos?api_key=${APIKey}&language=en-US`);
      
  
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
      setActiveTab("1")
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
  
  return (
    <HelmetProvider>
      <Header />
      <Helmet>
        <title>{detailsMovie.title ? `${detailsMovie.title} - ` : ""}justmovies</title>
        <meta name="description" content={detailsMovie.overview} />
        <meta name="keywords" content={`movie, ${detailsMovie.title}, trailer, characters, similar movies`} />
        <meta name="og:title" content={detailsMovie.title} />
        <meta property="og:site_name" content="justmovies" />
        <meta property="og:type" content="video.movie" />
        <meta property="video:duration" content={detailsMovie.runtime * 60} />
        <meta property="og:url" content={`${process.env.REACT_APP_SERVER_BACK_URL}/movies/${detailsMovie.id}`} />
        <meta property="og:image" content={imagePath + detailsMovie.poster_path} />
        <meta property="video:release_date" content={detailsMovie.release_date} />
        {genres.map((genre, index) => (
          <meta key={index} property="video:tag" content={genre.name} />
        ))}
        {characters.map((character, index) => (
          <meta key={index} property="video:actor" content={character.name} />
        ))}
        <meta property="og:video" content={`https://youtube.com/embed/${trailer.key}`} />
        <meta name="og:description" content={detailsMovie.overview} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>
      <main className="details">
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
                    detailsMovie.poster_path ? imagePath + detailsMovie.poster_path : "/imageError.webp"
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
                    <LoadingButton styleButton="details_container_movie-details-favorite" event={handleFavorite} loading={loadingButton} message={favorited ? <AiFillHeart size={25} color="#FF0043" /> : <AiFillHeart size={25} color="#808080" />} />
                  </span>

                  <hr />

                  <div className="details_container_movie-details_genres">
                    {genres.map((genre) => (
                      <Link
                        to={`/genre/${genre.id}/${genre.name.replaceAll(" ", "-").toLowerCase()}`}
                        className="details_container_movie-details_genres-button"
                        key={genre.id}
                      >
                        {genre.name}
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
                {trailer && trailer.key && (
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

              <div>
                <TabContext value={activeTab}>
                  <TabList
                    TabIndicatorProps={{
                      sx: {backgroundColor: "#808080"}
                    }}
                    sx={{
                      color: "#f3f3f3", 
                      bgcolor: "#202020",
                    }}
                    textColor="inherit"
                    onChange={handleTab}
                  >
                    <Tab disableRipple label="Characters" value="1" />
                    <Tab disableRipple label="Similar" value="2" />
                  </TabList>
                  
                  <TabPanel value="1" sx={{ padding: "0rem" }}>
                    <Swiper
                      slidesPerView={2.3}
                      spaceBetween={10}
                      breakpoints={breakpoints}
                      modules={[Navigation]}
                      navigation={true}
                      className="carousel1"
                    >
                      {characters.map((Character) => (
                        <SwiperSlide className="item" key={Character.id}>
                          <p>
                            <img
                              className="item-image"
                              loading="lazy"
                              width="640"
                              height="480"
                              src={
                                Character.profile_path ? imagePath + Character.profile_path : "/imageError.webp"
                              }
                              alt={`Portrait${Character.name ? ` of ${Character.name}` : ''}`}
                            />
                            <p className="item-text">{Character.name}</p>
                          </p>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </TabPanel>

                  <TabPanel value="2" sx={{ padding: "0rem" }}>
                    <Swiper
                      slidesPerView={2.3}
                      spaceBetween={10}
                      breakpoints={breakpoints}
                      modules={[Navigation]}
                      navigation={true}
                      className="carousel2"
                    >
                      {movieSimilar.map((similar) => (
                        <SwiperSlide className="item" key={similar.id}>
                          <Link
                            to={`/movies/${similar.id}`}
                            aria-label={similar.title}
                            draggable="false"
                          >
                            <p>
                              <img
                                className="item-image"
                                loading="lazy"
                                height="680"
                                width="440"
                                src={
                                  similar.poster_path ? imagePath + similar.poster_path : "/imageError.webp"
                                }
                                alt={
                                  similar.title ? similar.title : "a similar movie"
                                }
                              />
                              <p className="item-text">{similar.title}</p>
                            </p>
                          </Link>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </TabPanel>
                </TabContext>
              </div>
            </div>
          </>
        ) : (
          <div className="details_noFound">
            <h1>Movie no found.</h1>
          </div>
        )}
        <ToastContainer />
      </main>
    </HelmetProvider>
  );
};

export default MovieDetails;
