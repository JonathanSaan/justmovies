import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState, useEffect } from "react";

import { Header } from "../Header";
import APIKey from "../../mocks/api";
import "./style.scss";

export const MoviesGenre = ({ category, idGenreSelected }) => {
  
  const { genre } = useParams();
  
  const [ listMovies, setListMovies ] = useState([])
  
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const load = async () => {
      try {
        const particularGenre = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${idGenreSelected}&with_watch_monetization_types=flatrate`);
        setListMovies(particularGenre.data.results.slice(0, 18));
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
        <div className="MoviesGenre">
          <div className="ContainerGenre">
            <div className="title">
              <h1> 
                {genre.replaceAll("-", " ")}
              </h1>
            </div>
            <div className="NewMovie">
              {!listMovies.length == 0 ? (
                <>
                  {listMovies.map((movie) => (
                    <Link to={`/${movie.id}`}>
                      <div className="Movies" key={movie.id}>
                        <img className="MovieImage" src={movie.poster_path ? Image_path + movie.poster_path : imageError} alt={movie.title} /> 
                        <h2 className="MovieTitle">{movie.title}</h2>
                      </div>
                    </Link>
                  ))}
                </>
              ) : (
                <div className="MoviesGenreLoading">
                  {Array(18).fill(1).map((card, index) => (
                    <div className="MoviesGenreLoading2" >
                      <Skeleton className="ImageLoading" variant="rectangular" />
                      <Skeleton className="Text" variant="text" count={1}/>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
};