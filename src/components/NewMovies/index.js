import { useState, useEffect } from "react";

import axios from "axios";
//import Pagination from '@mui/material/Pagination';
//import { Stack } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import APIKey from "../../mocks/api";
import { Header } from "../Header";
import "./style.scss"


export const NewMovies = () => {
  
  const navigate = useNavigate();
  
  const [ listMovies, setListMovies ] = useState([]);
  
  const [page, setPage] = useState(1);
  //const [totalPage, setTotalPage] = useState();
  
  useEffect(() => { 
    window.scrollTo(0, 0);
    const load = async () => {
      try {
        const respost = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKey}&language=en-US&page=${page}`);
        //setTotalPage(respost.data.total_pages)
        setListMovies(respost.data.results);
      } catch (error) {
        console.log(error);
      };
    };
    load() 
  }, [] );
  
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(18);
  
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentmovies = listMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  /*const paginate = (event, value) => {
    setCurrentPage(value);
    //setPage(3);
    
    window.scrollTo({ top: 1600, behavior: 'smooth' });
  };
*/
  const Image_path = "https://image.tmdb.org/t/p/w500";
  const imageError = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHowX2RIOXDQtQ6EWW7zJ_RC8xhiSsXNihA&usqp=CAU";
  
  return (
    <>
      <Header />
      <div className="ContainerMovies">
        <div className="NewMovie">
          <div className="Title">
            <h1>New Movies</h1>
          </div>
          {!listMovies.length == 0 ? (
            <>
              {currentmovies.map((movie) => (
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
       /* <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center">
          {listMovies.length > 18 && (
            <Pagination
              color="primary"
              shape="rounded"
              defaultPage={1}
              count={totalPage}
              page={currentPage}
              onChange={paginate}
            />
          )}
        </Stack>*/