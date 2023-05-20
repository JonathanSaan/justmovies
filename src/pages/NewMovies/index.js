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

    window.scrollTo({ top: 1600, behavior: "smooth" });
  };

  const Image_path = "https://image.tmdb.org/t/p/w500";
  const imageError = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHowX2RIOXDQtQ6EWW7zJ_RC8xhiSsXNihA&usqp=CAU";
 
  return (
    <HelmetProvider>
      <Header />
      <Helmet>
        <title>new movies - justmovies</title>
      </Helmet>
      <div className="newmovies">
        <div className="newmovies_container">
          <h1 className="newmovies_container-title">New Movies</h1>
          {listMovies.length > 0 ? (
            <>
              {listMovies.map((movie) => (
                <div className="newmovies_container_card" key={movie.id}>
                  <Link to={`/${movie.id}`} aria-label={movie.title}>
                    <img
                      loading="lazy"
                      className="newmovies_container_card-image"
                      width="640"
                      height="480"
                      src={movie.poster_path ? Image_path + movie.poster_path : imageError}
                      alt={movie.title ? movie.title : "a new movie"}
                    />
                  </Link>
                  <Link to={`/${movie.id}`}>
                    <h2 className="newmovies_container_card-title">{movie.title}</h2>
                  </Link>
                </div>
              ))}
            </>
          ) : <SkeletonNewMovies />}
        </div>
        <Pagination page={page} totalPage={totalPage} paginate={paginate} />
      </div>
    </HelmetProvider>
  );
};

export default NewMovies;