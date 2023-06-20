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

    window.scrollTo({ top: 1600, behavior: "smooth" });
  };

  const Image_path = "https://image.tmdb.org/t/p/w500";
  const imageError = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHowX2RIOXDQtQ6EWW7zJ_RC8xhiSsXNihA&usqp=CAU";

  return (
    <HelmetProvider>
      <Header />
      <Helmet>
        <title>top rated - justmovies</title>
      </Helmet>
      <div className="ratedmovie">
        <div className="ratedmovie_container">
          <h1 className="ratedmovie_container-title">Top Rated</h1>
          {listRated.length > 0 ? (
            <>
              {listRated.map((rated) => (
                <div className="ratedmovie_container_card" key={rated.id}>
                  <Link to={`/movies/${rated.id}`} aria-label={rated.title}>
                    <img
                      loading="lazy"
                      className="ratedmovie_container_card-image"
                      src={rated.poster_path ? Image_path + rated.poster_path : imageError}
                      height="680"
                      width="440"
                      alt={rated.title ? rated.title : "a top rated movie"}
                    />
                  </Link>
                  <Link to={`/movies/${rated.id}`}>
                    <h2 className="ratedmovie_container_card-title">{rated.title}</h2>
                  </Link>
                </div>
              ))}
            </>
          ) : <SkeletonTopRated />}
        </div>
        <Pagination page={page} totalPage={totalPage} paginate={paginate} />
      </div>
    </HelmetProvider>
  );
};

export default TopRated;