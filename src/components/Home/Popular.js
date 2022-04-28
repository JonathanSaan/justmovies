import axios from "axios";
import Whirligig from "react-whirligig";
import APIKey from "../../mocks/api";
import { useState, useEffect } from "react";

export const Popular = () => {
  
  const [ listPopular, setListPopular ] = useState([])
  const Image_path = "https://image.tmdb.org/t/p/w500";
  
  useEffect(
    function () {
      load()
    }, []
  )
  
  async function load() {
    try {
      const respost = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=en-US&page=1`)
      setListPopular(respost.data.results)
    } catch (error) {
      console.log(error)
    }
  }
  

 return (
   <>
    <Whirligig visibleSlides={5} gutter="1em">
      {listPopular.map((popular) => (
        <div className="Populars" key={popular.id}>
          <img src={`${Image_path}${popular.poster_path}`} alt={popular.title} />
          <h1 className="PopularTitle">{popular.title}</h1>
        </div>
      ))}
    </Whirligig>
   </>
  );
  
};