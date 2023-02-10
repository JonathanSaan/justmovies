import { useState, useEffect, useRef } from "react";

import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IoIosStar } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";


import APIKey from "../../mocks/api";
import { detailscarouselsetting } from "../../mocks/carouselsettings";
import Header from "../Header";
import "./style.scss";

const Details = () => {
  const navigate = useNavigate();

  const { details } = useParams();

  const [detailsMovie, setDetailsMovie] = useState([]);
  const [yearMovie, setYearMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [trailer, setTrailer] = useState([]);

  const carousel1 = useRef();
  const carousel2 = useRef();
  const [width, setWidth] = useState(0);

  const [activeTab, setActiveTab] = useState("tab1");
  const handleTab1 = () => {
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    setActiveTab("tab2");
  };

  const [characters, setCharacters] = useState([]);
  const [movieSimilar, setMovieSimilar] = useState([]);

  const refreshPage = () => {
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
    console.log("page to reload");
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(carousel1);
    console.log(carousel2);
    setWidth(carousel1.current?.scrollWidth - carousel1.current?.offsetWidth);
    setWidth(carousel2.current?.scrollWidth - carousel2.current?.offsetWidth);

    setTimeout(() => {
      const load = async () => {
        const respost = await axios.get(
          `https://api.themoviedb.org/3/movie/${details}?api_key=${APIKey}&language=en-US`
        );
        setDetailsMovie(respost.data);
        setGenres(respost.data.genres);
        setYearMovie(respost.data.release_date.slice(0, 4));

        const videos = await axios.get(
          `https://api.themoviedb.org/3/movie/${details}/videos?api_key=${APIKey}&language=en-US&append_to_response=videos`
        );

        const stateVideo = () => {
          if (videos.data.results.length > 0) {
            return setTrailer(videos.data.results[0]);
          }
          return null;
        };
        stateVideo();

        const dataSimilar = await axios.get(
          `https://api.themoviedb.org/3/movie/${details}/similar?api_key=${APIKey}&language=en-US&page=1`
        );
        setMovieSimilar(dataSimilar.data.results);

        const credits = await axios.get(
          `https://api.themoviedb.org/3/movie/${details}/credits?api_key=${APIKey}&language=en-US`
        );
        setCharacters(credits.data.cast);
        setLoading(true);
      };
      load();
    }, 1000);
  }, []);

  const imagePath = "https://image.tmdb.org/t/p/w500";
  const imageError =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHowX2RIOXDQtQ6EWW7zJ_RC8xhiSsXNihA&usqp=CAU";

  return (
    <>
      <Header />
      <Helmet>
        <title>{detailsMovie.title ? detailsMovie.title : ""} - justmovies</title>
      </Helmet>
      <div className="details">
        <div
          className="details_backdrop"
          style={{
            backgroundImage: `url(${imagePath}${detailsMovie.backdrop_path})`,
          }}
        ></div>

        <div className="details_container">
          <div className="details_container_movie">
            {detailsMovie.poster_path && (
              <img
                loading="lazy"
                className="details_container_movie-image"
                src={detailsMovie.poster_path ? imagePath + detailsMovie.poster_path : imageError}
                alt={detailsMovie.title}
              />
            )}

            {!detailsMovie.poster_path && !loading && (
              <Skeleton
                className="details_container_movie-image"
                variant="rectangular"
              />
            )}

            <span className="details_container_movie-details">
              <h1 className="details_container_movie-details-title">
                {detailsMovie.title || <Skeleton variant="text" count={2} />}
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
                  <Link
                    to={`/genre/${genre.id}/${genre.name
                      .replaceAll(" ", "-")
                      .toLowerCase()}`}
                  >
                    <button className="details_container_movie-details_genres-button">{genre.name}</button>
                  </Link>
                ))}
              </div>
            </span>
          </div>

          <div className="details_container_movie-synopsis">
            <hr />

            <h2 className="details_container_movie-synopsis-paragraph">
              {detailsMovie.overview || <Skeleton variant="text" count={7} />}
            </h2>
          </div>

          <div className="details_container_movie-containervideo">
            {trailer.key && (
              <iframe
                className="details_container_movie-containervideo-video"
                src={"https://youtube.com/embed/" + trailer.key}
                target="_parent"
                frameborder="0"
                title="trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            )}

            {!trailer.key && !loading && (
              <Skeleton className="details_container_movie-containervideo-video" variant="rectangular" />
            )}
          </div>

          <div className="AllTab">
            <Tabs defaultIndex={0} className="Tabs">
              <TabList className="TabList">
                <Tab
                  onClick={handleTab1}
                  className={activeTab === "tab1" ? "active" : "false"}
                >
                  Characters
                </Tab>
                <Tab
                  onClick={handleTab2}
                  className={activeTab === "tab2" ? "active" : "false"}
                >
                  Similar
                </Tab>
              </TabList>
              <TabPanel className="TabPanel">
                {!characters.length == 0 ? (
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
                ) : (
                  <Slider {...detailscarouselsetting} className="carousel1">
                    {Array(20)
                      .fill(1)
                      .map((card, index) => (
                        <div className="item">
                          <Skeleton
                            className="ImageLoading"
                            variant="rectangular"
                          />
                          <Skeleton className="Text" variant="text" count={1} />
                        </div>
                      ))}
                  </Slider>
                )}
              </TabPanel>

              <TabPanel className="TabPanel">
                {!movieSimilar.length == 0 ? (
                  <Slider {...detailscarouselsetting} className="carousel2">
                    {movieSimilar.map((similar) => (
                      <div
                        onClick={() => {
                          navigate(`/${similar.id}`);
                          refreshPage();
                        }}
                        className="item"
                        key={similar.id}
                      >
                        <img
                          src={similar.poster_path ? imagePath + similar.poster_path : imageError}
                          loading="lazy"
                          alt={similar.title}
                        />
                        <p>{similar.title}</p>
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <Slider {...detailscarouselsetting} className="carousel1">
                    {Array(20)
                      .fill(1)
                      .map((card, index) => (
                        <div className="item">
                          <Skeleton
                            className="ImageLoading"
                            variant="rectangular"
                          />
                          <Skeleton className="Text" variant="text" count={1} />
                        </div>
                      ))}
                  </Slider>
                )}
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;