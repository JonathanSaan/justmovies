import { useState, useEffect } from "react";

import axios from "axios";
import { Pagination, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Header from "../Header";
import APIKey from "../../mocks/api";
import "./style.scss";

const MoviesGenre = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { genre } = useParams();

  const [listMovies, setListMovies] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();

  const LoadMoviesGenre = async () => {
    const respost = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${id}&with_watch_monetization_types=flatrate`
    );

    setTotalPage(respost.data.total_pages);
    setListMovies(respost.data.results.slice(0, 18));

    if (respost.data.total_pages > 500) {
      return setTotalPage(500);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    LoadMoviesGenre();
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
      <div className="ContainerGenre">
        <div className="MoviesGenre">
          <div className="Title">
            <h1>{genre.replaceAll("-", " ")}</h1>
          </div>
          {!listMovies.length == 0 ? (
            <>
              {listMovies.map((movie) => (
                <div
                  onClick={() => {
                    navigate(`/${movie.id}`);
                  }}
                  className="Movies"
                  key={movie.id}
                >
                  <img
                    className="MovieImage"
                    src={
                      movie.poster_path
                        ? Image_path + movie.poster_path
                        : imageError
                    }
                    alt={movie.title}
                  />
                  <h2 className="MovieTitle">
                    {movie.title || <Skeleton variant="text" count={1} />}
                  </h2>
                </div>
              ))}
            </>
          ) : (
            <div className="MoviesGenreLoading">
              {Array(18)
                .fill(1)
                .map((card, index) => (
                  <div className="MoviesGenreLoading2">
                    <Skeleton className="ImageLoading" variant="rectangular" />
                    <Skeleton className="Text" variant="text" count={1} />
                  </div>
                ))}
            </div>
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

export default MoviesGenre;