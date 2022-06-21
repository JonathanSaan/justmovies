import { useState, useEffect } from "react";

import axios from "axios";
import { Pagination, Stack } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import APIKey from "../../mocks/api";
import { Header } from "../Header";
import "./style.scss"



export const TopRated = () => {
  
  const navigate = useNavigate();
  
  const [ listRated, setListRated ] = useState([]);
  
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  
  const LoadTopRated = async () => {
    const respost = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKey}&language=en-US&page=${page}`);
    setTotalPage(respost.data.total_pages);
    setListRated(respost.data.results.slice(0, 18));
    
    if (respost.data.total_pages > 500) {
      return setTotalPage(500);
    };
  };
  
  useEffect(() => { 
    window.scrollTo(0, 0);
    LoadTopRated() 
  }, [page] );
  
  const paginate = (event, value) => {
    setPage(value);
    
    window.scrollTo({ top: 1600, behavior: 'smooth' });
  };
  
  const Image_path = "https://image.tmdb.org/t/p/w500";
  const imageError = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHowX2RIOXDQtQ6EWW7zJ_RC8xhiSsXNihA&usqp=CAU";
  
  
  return (
    <>
      <Header />
      <div className="ContainerRated">
        <div className="TopRated">
          <div className="Title">
            <h1>Top Rated</h1>
          </div>
          {!listRated.length == 0 ? (
            <>
              {listRated.map((rated) => (
                <div onClick={() => {navigate(`/${rated.id}`) }} className="Rateds" key={rated.id}>
                  <img className="RatedImage" src={rated.poster_path ? Image_path + rated.poster_path : imageError} alt={rated.name}/>
                  <h2 className="RatedTitle">{rated.title}</h2>
                </div>
              ))}
            </>
          ) : (
            <div className="TopRatedMovieLoading">
              {Array(18).fill(1).map((card, index) => (
                <div className="TopRatedMovieLoading2" >
                  <Skeleton className="ImageLoading" variant="rectangular" />
                  <Skeleton className="Text" variant="text" count={1}/>
                </div>
              ))}
            </div>
          )}
        </div>
        <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center">
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