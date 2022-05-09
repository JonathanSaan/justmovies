import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";

import { Header } from "../Header";
import APIKey from "../../mocks/api";
import "./style.scss";

export const Search = () => {
  
  const { searched } = useParams();
  const UrlApi = `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&language=en-US&query=${searched}&page=1&include_adult=false`
  
  const [ searchesFound, setSearchesFound ] = useState([]);
  
  useEffect(() => { 
    const load = async () => {
      try {
        const respost = await axios.get(UrlApi);
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
        <Header />
        <div className = "Search">
          <div className = "Container">
            <div className="ResultdFound">
              <h1>Results found: {searched.replaceAll("+", " ")}</h1>
            </div>
            
            <div className="SearcheFound">
              {searchesFound.map((movie) => (
               <>
                <Link to={`/${movie.id}`}>
                  <div key={movie.id}>
                    <div className="Image">
                      <img className="PrincipalImage" src={movie.poster_path ? imagePath + movie.poster_path : imageError} alt={movie.title} />
                    </div>
                    <div className="description">
                      <h1 className="MovieTitle">
                        {movie.title}
                      </h1>
                      <p className="Overview">
                        {movie.overview.length > 150 ? (
                          `${movie.overview.substring(0, 150)}...`  ) : (
                            (
                              <p className="Overview">
                                {movie.overview}
                              </p>
                            )
                          )}
                      </p>
                      <div className="Vote">
                        <IoIosStar size={10} color="yellow"/>
                        {movie.vote_average}
                      </div>
                    </div>
                  </div>
                </Link>
                <hr />
               </>
              ))}
            </div>
          </div>
        </div>
      </>
    );
};
