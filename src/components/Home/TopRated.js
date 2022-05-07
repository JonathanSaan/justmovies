import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import APIKey from "../../mocks/api";


export const TopRated = () => {
  
  const [ listRated, setListRated ] = useState([])
  const Image_path = "https://image.tmdb.org/t/p/w500";
  const Image_Error = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHowX2RIOXDQtQ6EWW7zJ_RC8xhiSsXNihA&usqp=CAU";
  
  useEffect(() => { load() }, [] );
  
  async function load() {
    try {
      const respost = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKey}&language=en-US&page=1`);
      setListRated(respost.data.results.slice(1, 13));
    } catch (error) {
      console.log(error);
    };
  };
  
  return (
    <>
      {listRated.map((rated) => (
        <Link to={`/${rated.id}`} >
          <div className="Rateds" key={rated.id}>
            <img className="RatedImage" src={`${Image_path}` ? `${Image_path}${rated.poster_path}` : {Image_Error}} alt={rated.name}/>
            <h2 className="RatedTitle">{rated.title}</h2>
          </div>
        </Link>
      ))}
    </>
  );

};
