import { useState, useEffect } from "react";

import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import { Helmet } from "react-helmet";

import Header from "../Header";
import APIKey from "../../mocks/api";
import "./style.scss";

const Search = () => {
  const { searched } = useParams();

  const [searchesFound, setSearchesFound] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const load = async () => {
      const respost = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&language=en-US&query=${searched}&page=1&include_adult=false`
      );
      setSearchesFound(respost.data.results);
    };
    load();
  }, [searched]);

  const imagePath = "https://image.tmdb.org/t/p/w500";
  const imageError =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHowX2RIOXDQtQ6EWW7zJ_RC8xhiSsXNihA&usqp=CAU";

  return (
    <>
      <Header />
      <Helmet>
        <title>Search result for {searched} - justmovies</title>
      </Helmet>
      <div className="search">
        <div className="search_container">
          <h1 className="search_container-title">
            Results found: {searched.replaceAll("+", " ")}
          </h1>
          {!searchesFound.length == 0 ? (
            <div className="search_container_moviefound">
              {searchesFound.map((movie) => (
                <Link
                  className="search_container_moviefound_card"
                  to={`/${movie.id}`}
                >
                  <div className="search_container_moviefound_card_containerimage">
                    {movie.poster_path && (
                      <img
                        loading="lazy"
                        className="search_container_moviefound_card_containerimage-image"
                        src={
                          movie.poster_path
                            ? imagePath + movie.poster_path
                            : imageError
                        }
                        alt={movie.title}
                      />
                    )}

                    {movie.poster_path === null && (
                      <img
                        loading="lazy"
                        className="search_container_moviefound_card_containerimage-image"
                        src={imageError}
                        alt="image error"
                      />
                    )}
                  </div>
                  <div className="search_container_moviefound_card_description">
                    <h1 className="search_container_moviefound_card_description-title">
                      {movie.title}
                    </h1>
                    <p className="search_container_moviefound_card_description-synopsis">
                      {movie.overview.length > 150 ? (
                        `${movie.overview.substring(0, 150)}...`
                      ) : (
                        <p className="search_container_moviefound_card_description-synopsis">
                          {movie.overview}
                        </p>
                      )}
                    </p>
                    <div className="search_container_moviefound_card_description_vote">
                      <IoIosStar
                        className="search_container_moviefound_card_description_vote-icon"
                        size={10}
                        color="yellow"
                      />
                      <p>{movie.vote_average}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="search_container-movienoFound">
              <h2 className="search_container-movienoFound-title">
                No results found.{" "}
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;