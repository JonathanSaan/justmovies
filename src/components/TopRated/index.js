import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import APIKey from "../../mocks/api";
import { Header } from "../Header";
import "./style.scss"

export const TopRated = () => {
  
  const [ listRated, setListRated ] = useState([])
  
  useEffect(() => { 
    window.scrollTo(0, 0);
    const load = async () => {
      try {
        const respost = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKey}&language=en-US&page=1`);
        setListRated(respost.data.results.slice(0, 18));
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
        <div className="ContainerRated">
          <div className="TopRated">
            <div className="title">
              <h1>Top Rated</h1>
            </div>
            {listRated.map((rated) => (
              <Link to={`/${rated.id}`} >
                <div className="Rateds" key={rated.id}>
                  <img className="RatedImage" src={rated.poster_path ? Image_path + rated.poster_path : imageError} alt={rated.name}/>
                  <h2 className="RatedTitle">{rated.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </>
    );
    
};