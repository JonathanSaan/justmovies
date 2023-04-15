import { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import APIKey from "../../mocks/api";
import "./style.scss";

const MoviesGenre = () => {
  const navigate = useNavigate();
  const { id, genre } = useParams();
  const page = new URLSearchParams(window.location.search).get('page') ? parseInt(new URLSearchParams(window.location.search).get('page')) : 1;

  const [listMovies, setListMovies] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const LoadMoviesGenre = async () => {
      const respost = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${id}&with_watch_monetization_types=flatrate`);
      setTotalPage(respost.data.total_pages);
      setListMovies(respost.data.results.slice(0, 18));
  
      if (respost.data.total_pages > 500) {
        return setTotalPage(500);
      }
    };
    LoadMoviesGenre();
  }, [id, page]);

  const paginate = (event, value) => {
    const nextPage = value > 1 ? value : 1;
    const route = `/genre/${id}/${genre}?page=${nextPage}`;
    navigate(route, { replace: true });

    window.scrollTo({ top: 1600, behavior: "smooth" });
  };

  const Image_path = "https://image.tmdb.org/t/p/w500";
  const imageError = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHowX2RIOXDQtQ6EWW7zJ_RC8xhiSsXNihA&usqp=CAU";

  return (
    <>
      <Header />
      <Helmet>
        <title>{genre} - justmovies</title>
      </Helmet>
      <div className="genre">
        <div className="genre_containergenre">
          <h1 className="genre_containergenre-title">{genre.replace(/-/g, " ")}</h1>
          {listMovies.length > 0 ? (
            <>
              {listMovies.map((movie) => (
                <div
                  onClick={() => {navigate(`/${movie.id}`)}}
                  className="genre_containergenre_card"
                  key={movie.id}
                >
                  <img
                    loading="lazy"
                    className="genre_containergenre_card-image"
                    src={movie.poster_path ? Image_path + movie.poster_path : imageError}
                    alt={movie.title}
                  />
                  <h2 className="genre_containergenre_card-title">
                    {movie.title}
                  </h2>
                </div>
              ))}
            </>
          ) : (
            <>
              {Array(18).fill(1).map((card, index) => (
                  <div className="genre_containergenre_card">
                    <Skeleton className="genre_containergenre_card-image" variant="rectangular" />
                    <Skeleton className="genre_containergenre_card-title" variant="text" count={1} />
                  </div>
                ))}
            </>
          )}
        </div>
        <Pagination page={page} totalPage={totalPage} paginate={paginate} />
      </div>
    </>
  );
};

export default MoviesGenre;