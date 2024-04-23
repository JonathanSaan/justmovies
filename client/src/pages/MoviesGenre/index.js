import { useState, useEffect } from "react";

import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Header from "../../components/Header";
import resetComponents from "../../utils/ResetComponents";
import { SkeletonMoviesGenre } from "../../components/Skeleton";
import Pagination from "../../components/Pagination";
import APIKey from "../../mocks/api";
import "./style.scss";

const MoviesGenre = () => {
  const { id, genre } = useParams();
  const navigate = useNavigate();

  const page = new URLSearchParams(window.location.search).get("page") ? parseInt(new URLSearchParams(window.location.search).get("page")) : 1;

  const [listMovies, setListMovies] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 1600, behavior: "smooth" });
    
    const LoadMoviesGenre = async () => {
      const respost = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${id}&with_watch_monetization_types=flatrate`);
      setTotalPage(respost.data.total_pages);
      setListMovies(respost.data.results.slice(0, 18));

      if (respost.data.total_pages > 500) {
        return setTotalPage(500);
      }
    };
    resetComponents(setListMovies);
    LoadMoviesGenre();
  }, [id, page]);

  const paginate = (event, value) => {
    const nextPage = value > 1 ? value : 1;
    const route = `/genre/${id}/${genre}?page=${nextPage}`;
    navigate(route, { replace: true });
  };

  const Image_path = "https://image.tmdb.org/t/p/w500";
  
  return (
    <HelmetProvider>
      <Header />
      <Helmet>
        <title>{genre.replace(/-/g, " ")} - justmovies</title>
        <meta name="description" content={`Explore ${genre.replace(/-/g, " ")} movies on justmovies. Browse through a variety of ${genre.replace(/-/g, " ")} movies and find your favorites.`} />
        <meta name="keywords" content={`movies genre, movie category, justmovies genre, ${genre.replace(/-/g, " ")}`} />
      </Helmet>
      <main className="genre">
        <h1 className="genre-title">
          {genre.replace(/-/g, " ")}
        </h1>
        <div className="genre_containergenre">
          {listMovies.length > 0 ? (
            <>
              {listMovies.map((movie) => (
                <Link to={`/movies/${movie.id}`} className="genre_containergenre_card" key={movie.id} aria-label={movie.title}>
                  <div>
                    <img
                      loading="lazy"
                      className="genre_containergenre_card-image"
                      height="680"
                      width="440"
                      src={movie.poster_path ? Image_path + movie.poster_path : "/imageError.webp"}
                      alt={movie.title ? movie.title : "a movie"}
                    />
                    <h2 className="genre_containergenre_card-title">{movie.title}</h2>
                  </div>
                </Link>
              ))}
            </>
          ) : (
            <SkeletonMoviesGenre />
          )}
        </div>
        <Pagination page={page} totalPage={totalPage} paginate={paginate} />
      </main>
    </HelmetProvider>
  );
};

export default MoviesGenre;
