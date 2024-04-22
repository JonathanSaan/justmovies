import { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Header from "../../components/Header";
import resetComponents from "../../utils/ResetComponents";
import { SkeletonTopRated } from "../../components/Skeleton";
import Pagination from "../../components/Pagination";
import APIKey from "../../mocks/api";
import "./style.scss";

const TopRated = () => {
  const navigate = useNavigate();

  const page = new URLSearchParams(window.location.search).get('page') ? parseInt(new URLSearchParams(window.location.search).get('page')) : 1;

  const [listRated, setListRated] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 1600, behavior: "smooth" });
    
    const LoadTopRated = async () => {
      const respost = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKey}&language=en-US&page=${page}`);
      setTotalPage(respost.data.total_pages);
      setListRated(respost.data.results.slice(0, 18));
      
      if (respost.data.total_pages > 500) {
        return setTotalPage(500);
      }
    };
    resetComponents(setListRated);
    LoadTopRated();
  }, [page]);

  const paginate = (event, value) => {
    const nextPage = value > 1 ? value : 1;
    const route = `/top-rated?page=${nextPage}`;
    navigate(route, { replace: true });
  };

  const Image_path = "https://image.tmdb.org/t/p/w500";
  
  return (
    <HelmetProvider>
      <Header />
      <Helmet>
        <title>top rated - justmovies</title>
        <meta name="description" content="Discover the top-rated movies on justmovies. Check out the best-rated movies of all time and find new favorites." />
        <meta name="keywords" content="top-rated movies, best-rated movies, highest-rated films" />
      </Helmet>
      <main className="ratedmovie">
        <h1 className="ratedmovie-title">Top Rated</h1>
        <div className="ratedmovie_container">
          {listRated.length > 0 ? (
            <>
              {listRated.map((rated) => (
                <Link to={`/movies/${rated.id}`} className="ratedmovie_container_card" key={rated.id} aria-label={rated.title}>
                  <div>
                    <img
                      loading="lazy"
                      className="ratedmovie_container_card-image"
                      src={rated.poster_path ? Image_path + rated.poster_path : "/imageError.webp"}
                      height="680"
                      width="440"
                      alt={rated.title ? rated.title : "a top rated movie"}
                    />
                    <h2 className="ratedmovie_container_card-title">{rated.title}</h2>
                  </div>
                </Link>
              ))}
            </>
          ) : <SkeletonTopRated />}
        </div>
        <Pagination page={page} totalPage={totalPage} paginate={paginate} />
      </main>
    </HelmetProvider>
  );
};

export default TopRated;
