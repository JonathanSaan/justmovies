import { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Header from "../../components/Header";
import resetComponents from "../../utils/ResetComponents";
import { SkeletonNewMovies } from "../../components/Skeleton";
import Pagination from "../../components/Pagination";
import APIKey from "../../mocks/api";
import "./style.scss";

const NewMovies = () => {
  const navigate = useNavigate();

  const page = new URLSearchParams(window.location.search).get('page') ? parseInt(new URLSearchParams(window.location.search).get('page')) : 1;

  const [listMovies, setListMovies] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  
  useEffect(() => {
    window.scrollTo({ top: 1600, behavior: "smooth" });
    
    const LoadMovies = async () => {
      const respost = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKey}&language=en-US&page=${page}`);
      setTotalPage(respost.data.total_pages);
      setListMovies(respost.data.results.slice(0, 18));
      
      if (respost.data.total_pages > 500) {
        return setTotalPage(500);
      }
    };
    resetComponents(setListMovies);
    LoadMovies();
  }, [page]);

  const paginate = (event, value) => {
    const nextPage = value > 1 ? value : 1;
    const route = `/new-movies?page=${nextPage}`;
    navigate(route, { replace: true });
  };

  const Image_path = "https://image.tmdb.org/t/p/w500";
  
  return (
    <HelmetProvider>
      <Header />
      <Helmet>
        <title>new movies - justmovies</title>
        <meta name="description" content="Discover the latest new movies on justmovies. Explore the newest releases and find your next favorite film." />
        <meta name="keywords" content="new movies, latest releases" />
      </Helmet>
      <main className="newmovies">
        <h1 className="newmovies-title">New Movies</h1>
        <div className="newmovies_container">
          {listMovies.length > 0 ? (
            <>
              {listMovies.map((movie) => (
                <Link to={`/movies/${movie.id}`} className="newmovies_container_card" key={movie.id} aria-label={movie.title}>
                  <div>
                    <img
                      loading="lazy"
                      className="newmovies_container_card-image"
                      height="680"
                      width="440"
                      src={movie.poster_path ? Image_path + movie.poster_path : "/imageError.webp"}
                      alt={movie.title ? movie.title : "a new movie"}
                    />
                    <h2 className="newmovies_container_card-title">{movie.title}</h2>
                  </div>
                </Link>
              ))}
            </>
          ) : <SkeletonNewMovies />}
        </div>
        <Pagination page={page} totalPage={totalPage} paginate={paginate} />
      </main>
    </HelmetProvider>
  );
};

export default NewMovies;
