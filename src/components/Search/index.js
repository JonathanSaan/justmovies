import axios from "axios";
import { css } from "@emotion/react";
import PuffLoader from "react-spinners/PuffLoader";
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
  
  const override = css`
    display: block;
    margin: 20vh auto;
    color: #FFF;
    border-color: #FFF;
  `;
  
  const [ loading, setLoading ] = useState(false);
  
  
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
  
  const styleSkeleton = {
    marginRight: '18px'
  }
  
  return (
      <>
        <Header/>
        <div className = "Search">
          <div className = "ContainerSearch">
            <div className="ResultdFound">
              <h1>Results found: {searched.replaceAll("+", " ")}</h1>
            </div>
            {searchesFound.length > 1 && 
              <div className="SearcheFound">
                {searchesFound.map((movie) => (
                  <>
                    <Link to={`/${movie.id}`}>
                      <div key={movie.id}>
                        <div className="Image">
                          {movie.poster_path !== 0 ? <img className="PrincipalImage" src={movie.poster_path ? imagePath + movie.poster_path  : imageError} alt={movie.title} /> 
                          : ( 
                            <Skeleton style={styleSkeleton} variant="rectangular" width={120} height={180} />
                            )}
                        </div>
                        <div className="description">
                          <h1 className="MovieTitle">
                            {movie.title || <Skeleton variant="text" count={1}/>}
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
              }
            
            {!loading && 
              <div>
                <PuffLoader color={'#FFF'} css={override} size={150} /> 
              </div>
            }
            
            {loading && searchesFound.length === 0 && 
              <div className="noSearchFound">
                <h2>No results found. </h2>
              </div> 
            }
          </div>
        </div>
      </>
    );
};