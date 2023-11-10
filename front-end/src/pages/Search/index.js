import { useState, useRef, useCallback, useEffect } from "react";

import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import InfiniteScroll from "react-infinite-scroll-component";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Header from "../../components/Header";
import resetComponents from "../../utils/ResetComponents";
import Loading from "../../components/Loading";
import APIKey from "../../mocks/api";
import "./style.scss";

const Search = () => {
  const offset = useRef(1);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searched = searchParams.get("q");

  const [searchesFound, setSearchesFound] = useState([]);
  const [hasMoreResults, setHasMoreResults] = useState(true);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&language=en-US&query=${searched}&page=${offset.current}&include_adult=false`);
    
    setSearchesFound((oldSearchesFound) => [
      ...oldSearchesFound,
      ...response.data.results,
    ]);
    offset.current += 1;

    if (response.data.results.length === 0) {
      setHasMoreResults(false);
    }
    
    setLoading(false);
  }, [searched]);

  useEffect(() => {
    setLoading(true);
    setHasMoreResults(true);
    setSearchesFound([]);
    resetComponents(setSearchesFound, offset);
    load();
  }, [searched, load]);

  const imagePath = "https://image.tmdb.org/t/p/w500";
  const imageError = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHowX2RIOXDQtQ6EWW7zJ_RC8xhiSsXNihA&usqp=CAU";

  return (
    <HelmetProvider>
      <Header />
      <Helmet>
        <title>Search result for {searched} - justmovies</title>
        <meta name="description" content={`Search result for ${searched} on justmovies. Browse and discover movies matching your search query.`} />
        <meta name="keywords" content={`search, movies, results, ${searched}`} />
      </Helmet>
      <main className="search">
        <div className="search_container">
          <h1 className="search_container-title">Results found: {searched}</h1>
          {loading ? (
            null
          ) : searchesFound.length > 0 ? (
            <div className="search_container_moviefound">
              <InfiniteScroll
                dataLength={searchesFound.length}
                next={load}
                hasMore={hasMoreResults}
                loader={<Loading />}
              >
                {searchesFound.map((movie) => (
                  <div
                    className="search_container_moviefound_card"
                    key={movie.id}
                  >
                    <div className="search_container_moviefound_card_containerimage">
                      <Link
                        className="search_container_moviefound_card_containerimage"
                        to={`/movies/${movie.id}`}
                        aria-label={movie.title}
                      >
                        {movie.poster_path && (
                          <img
                            className="search_container_moviefound_card_containerimage-image"
                            height="280"
                            width="120"
                            src={
                              movie.poster_path ? imagePath + movie.poster_path : imageError
                            }
                            alt={movie.title}
                          />
                        )}
                      </Link>
                      <Link
                        className="search_container_moviefound_card_containerimage"
                        to={`/movies/${movie.id}`}
                        aria-label={movie.title}
                      >
                        {movie.poster_path === null && (
                          <img
                            className="search_container_moviefound_card_containerimage-image"
                            height="280"
                            width="120"
                            src={imageError}
                            alt="error"
                          />
                        )}
                      </Link>
                    </div>
                    <div className="search_container_moviefound_card_description">
                      <Link to={`/movies/${movie.id}`} aria-label={movie.title}>
                        <h1 className="search_container_moviefound_card_description-title">
                          {movie.title}
                        </h1>
                      </Link>
                      <span className="search_container_moviefound_card_description-synopsis">
                        {movie.overview.length > 150 ? (
                          `${movie.overview.substring(0, 150)}...`
                        ) : (
                          <p className="search_container_moviefound_card_description-synopsis">
                            {movie.overview}
                          </p>
                        )}
                      </span>
                      <div className="search_container_moviefound_card_description_vote">
                        <IoIosStar
                          className="search_container_moviefound_card_description_vote-icon"
                          size={15}
                          color="yellow"
                        />
                        <p>
                          {movie.vote_average ? movie.vote_average.toFixed(1) : 0}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </InfiniteScroll>
            </div>
          ) : (
            <div className="search_container-movienoFound">
              <h2 className="search_container-movienoFound-title">
                No results found.{" "}
              </h2>
            </div>
          )}
        </div>
      </main>
    </HelmetProvider>
  );
};

export default Search;
