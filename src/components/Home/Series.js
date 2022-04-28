import axios from "axios";
import APIKey from "../../mocks/api";
import { useState, useEffect } from "react";

export const Series = () => {
  
  const [ listSeries, setListSeries ] = useState([])
  const Image_path = "https://image.tmdb.org/t/p/w500";
  
  useEffect(
    function () {
      load()
    }, []
  )
  
  async function load() {
    try {
      const respost = await axios.get(`https://api.themoviedb.org/3/tv/airing_today?api_key=${APIKey}&language=en-US`)
      setListSeries(respost.data.results)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
        <>
          {listSeries.map((serie) => (
            <div className="Series" key={serie.id}>
              <img src={`${Image_path}${serie.poster_path}`} alt={serie.title}/>
              <h1 className="SerieTitle">{serie.name}</h1>
            </div>
          ))}
        </>
      );
    
}