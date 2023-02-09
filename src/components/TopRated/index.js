import { useState, useEffect } from "react";

import axios from "axios";
import { Pagination, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import APIKey from "../../mocks/api";
import Header from "../Header";
import "./style.scss";

const TopRated = () => {
  const navigate = useNavigate();

  const [listRated, setListRated] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();

  const LoadTopRated = async () => {
    const respost = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKey}&language=en-US&page=${page}`
    );
    setTotalPage(respost.data.total_pages);
    setListRated(respost.data.results.slice(0, 18));

    if (respost.data.total_pages > 500) {
      return setTotalPage(500);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    LoadTopRated();
  }, [page]);

  const paginate = (event, value) => {
    setPage(value);

    window.scrollTo({ top: 1600, behavior: "smooth" });
  };

  const Image_path = "https://image.tmdb.org/t/p/w500";
  const imageError =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHowX2RIOXDQtQ6EWW7zJ_RC8xhiSsXNihA&usqp=CAU";

  return (
    <>
      <Header />
      <div className="ratedmovie">
        <div className="ratedmovie_container">
          <h1 className="ratedmovie_container-title">Top Rated</h1>
          {!listRated.length == 0 ? (
            <>
              {listRated.map((rated) => (
                <div
                  onClick={() => {navigate(`/${rated.id}`)}}
                  className="ratedmovie_container_card"
                  key={rated.id}
                >
                  <img
                    className="ratedmovie_container_card-image"
                    src={rated.poster_path ? Image_path + rated.poster_path : imageError}
                    alt={rated.name}
                  />
                  <h2 className="ratedmovie_container_card-title">{rated.title}</h2>
                </div>
              ))}
            </>
          ) : (
            <>
              {Array(18).fill(1).map((card, index) => (
                  <div className="ratedmovie_container_card">
                    <Skeleton className="ratedmovie_container_card-image" variant="rectangular" />
                    <Skeleton className="ratedmovie_container_card-title" variant="text" count={1} />
                  </div>
                ))}
            </>
          )}
        </div>
        <Stack sx={{ mt: { lg: "114px", xs: "70px" } }} alignItems="center">
          <Pagination
            shape="rounded"
            defaultPage={page}
            count={totalPage}
            onChange={paginate}
          />
        </Stack>
      </div>
    </>
  );
};

export default TopRated;