import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import { Header } from "../Header";
import APIKey from "../../mocks/api";
import "./style.scss";

export const Search = () => {
  
  const { searched } = useParams();
  
  const [ searchesFound, setSearchesFound ] = useState([]);
  
  useEffect(() => { 
    window.scrollTo(0, 0);
    const load = async () => {
      try {
        const respost = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&language=en-US&query=${searched}&page=1&include_adult=false`);
        setSearchesFound(respost.data.results);
      } catch (error) {
        console.log(error);
      };
    };
    load()
  }, [searched] );
  
  
  const imagePath = "https://image.tmdb.org/t/p/w500";
  const imageError = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHowX2RIOXDQtQ6EWW7zJ_RC8xhiSsXNihA&usqp=CAU";
  
  
  
  return (
      <>
        <Header/>
        <div className = "Search">
          <div className = "ContainerSearch">
            <div className="ResultdFound">
              <h1>Results found: {searched.replaceAll("+", " ")}</h1>
            </div>
            {searchesFound.length > 0 ?
              <div className="SearcheFound">
              
                {searchesFound.map((movie) => (
                  <>
                    <Link to={`/${movie.id}`}>
                      <div className="Movies" key={movie.id}>
                        <div className="Image">
                          {movie.poster_path &&
                            <img className="PrincipalImage" src={imagePath + movie.poster_path} alt={movie.title} /> 
                          } 
                          
                          {movie.poster_path === null &&
                            <img className="PrincipalImage" src={imageError} alt={"image error"} /> 
                          }
                            
                        </div>
                        <div className="description">
                          <h1 className="MovieTitle">
                            {movie.title || <Skeleton variant="text" count={1}/>}
                          </h1>
                          <p className="Overview">
                            {movie.overview.length > 150 ? (
                              `${movie.overview.substring(0, 150)}...`  ) 
                              : (
                                  <p className="Overview">
                                    {movie.overview}
                                  </p>
                              )}
                          </p>
                          <div className="Vote">
                            <IoIosStar className="Star" size={10} color="yellow"/>
                            <p>
                              {movie.vote_average}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <hr />
                   </>
                  ))}
              </div>
              : (
                <div className="noSearchFound">
                  <h2>No results found. </h2>
                </div> 
              )
            }
            
          </div>
        </div>
      </>
    );
};