import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import APIKey from "../../mocks/api";


export const TopRated = () => {
  
  const [ listRated, setListRated ] = useState([])
  const Image_path = "https://image.tmdb.org/t/p/w500";
  
  useEffect(() => { 
    window.scrollTo(0, 0);
    const load = async () => {
      try {
        const respost = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKey}&language=en-US&page=1`);
        setListRated(respost.data.results.slice(1, 13));
      } catch (error) {
        console.log(error);
      };
    };
    
    load() 
  }, [] );
  
  
  return (
    <>
      {listRated.map((rated) => (
        <Link to={`/${rated.id}`} >
          <div className="Rateds" key={rated.id}>
            <img className="RatedImage" src={`${Image_path}${rated.poster_path}`} alt={rated.name}/>
            <h2 className="RatedTitle">{rated.title}</h2>
          </div>
        </Link>
      ))}
    </>
  );

};