import { useState, useEffect } from "react";

import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import APIKey from "../../mocks/api";



export const TopRated = ({ navigate }) => {
  
  const [ listRated, setListRated ] = useState([])
  
  useEffect(() => { 
    window.scrollTo(0, 0);
    const load = async () => {
      const respost = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKey}&language=en-US&page=1`);
      setListRated(respost.data.results.slice(0, 12));
    };
    load()
  }, [] );
  
  const Image_path = "https://image.tmdb.org/t/p/w500";
  const imageError = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHowX2RIOXDQtQ6EWW7zJ_RC8xhiSsXNihA&usqp=CAU";
  
  
  
  return (
    <>
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
          {Array(12).fill(1).map((card, index) => (
            <div className="TopRatedMovieLoading2" >
              <Skeleton className="ImageLoading" variant="rectangular" />
              <Skeleton className="Text" variant="text" count={1}/>
            </div>
          ))}
        </div>
      )}
    </>
  );
};