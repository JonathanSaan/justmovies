import axios from "axios";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState, useEffect } from "react";

import APIKey from "../../mocks/api";
import { Header } from "../Header";
import "./style.scss"


export const NewMovies = () => {
  
  const navigate = useNavigate();
  
  const [ listMovies, setListMovies ] = useState([])
  
  useEffect(() => { 
    window.scrollTo(0, 0);
    const load = async () => {
      try {
        const respost = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKey}&language=en-US&page=1`);
        setListMovies(respost.data.results.slice(0, 18));
      } catch (error) {
        console.log(error);
      };
    };
    load() 
  }, [] );
  
  const Image_path = "https://image.tmdb.org/t/p/w500";
  const imageError = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHowX2RIOXDQtQ6EWW7zJ_RC8xhiSsXNihA&usqp=CAU";
  
  return (
    <>
      <Header />
      <div className="ContainerMovies">
        <div className="NewMovie">
          <div className="title">
            <h1>New Movies</h1>
          </div>
          {!listMovies.length == 0 ? (
            <>
              {listMovies.map((movie) => (
                <div onClick={() => {navigate(`/${movie.id}`) }} className="Movies" key={movie.id}>
                  <img className="MovieImage" src={movie.poster_path ? Image_path + movie.poster_path : imageError} alt={movie.title} /> 
                  <h2 className="MovieTitle">{movie.title}</h2>
                </div>
              ))}
            </>
          ) : (
            <div className="NewMovieLoading" >
             {Array(18).fill(1).map((card, index) => (
                <div className="NewMovieLoading2" >
                  <Skeleton className="ImageLoading" variant="rectangular" />
                  <Skeleton className="Text" variant="text" count={1}/>
                </div>
              ))}
            </div>
          )}
          
        </div>
      </div>
    </>
  );
};