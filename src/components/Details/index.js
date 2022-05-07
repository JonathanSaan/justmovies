import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import Whirligig from "react-whirligig"

import APIKey from "../../mocks/api";
import { Header } from "../Header";
import "./style.scss";



import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

export const Details = () => {
  
  const { details } = useParams();
  
  
  const [ detailsMovie, setDetailsMovie ] = useState([]);
  //const yearMovie = `${detailsMovie.release_date}`
   
  const [ genres, setGenres ] = useState([]);
  const [ trailer, setTrailer ] = useState([]);
  
  
  const [ activeTab, setActiveTab ] = useState("tab1");
  const handleTab1 = () => {
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    setActiveTab("tab2");
  };
  
 
  
  const [ characters, setCharacters ] = useState([]);
  const [ movieSimilar, setMovieSimilar ] = useState([]);
  
  useEffect(() => { load() }, [] );
  
  async function load() {
    try {
      const respost = await axios.get(`https://api.themoviedb.org/3/movie/${details}?api_key=${APIKey}&language=en-US`);
      setDetailsMovie(respost.data);
      setGenres(respost.data.genres);
      //console.log(yearMovie)
      
      const videos = await axios.get(`https://api.themoviedb.org/3/movie/${details}/videos?api_key=${APIKey}&language=en-US&append_to_response=videos`);
      setTrailer(videos.data.results[0]);
      
      const dataSimilar = await axios.get(`https://api.themoviedb.org/3/movie/${details}/similar?api_key=${APIKey}&language=en-US&page=1`);
      setMovieSimilar(dataSimilar.data.results);
      
      const credits = await axios.get(`https://api.themoviedb.org/3/movie/${details}/credits?api_key=${APIKey}&language=en-US`);
      setCharacters(credits.data.cast);
      
    } catch (error) {
      console.log(error);
    };
  };
  
  
  const Image_path = "https://image.tmdb.org/t/p/w780";
  const Image_Error = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHowX2RIOXDQtQ6EWW7zJ_RC8xhiSsXNihA&usqp=CAU";
  
  
  return (
      <>
        <Header />
        <div className="Details">
          <div className="BackDrop" style={{backgroundImage: `url(${Image_path}${detailsMovie.backdrop_path})`}}>
          </div>
          
          <div className="Container">
            <div className="MovieDetails">
              <img className="PrincipalImage" src={`${Image_path}` ? `${Image_path}${detailsMovie.poster_path}` : `${Image_Error}`} alt={detailsMovie.title} />
              <span>
                <h1 className="TitleMovie">
                  {detailsMovie.original_title &&  detailsMovie.name }  {detailsMovie.title}
                </h1>
                <p className="ReleaseDate">
                  {detailsMovie.release_date}
                </p>
                <hr />
                
                <div className="Votes">
                  <IoIosStar size={15} color="yellow"/>
                  {detailsMovie.vote_average}
                </div>
                <hr />
                
                <div className="Genres">
                  {genres.map((genre) => 
                    <button className="genre">
                      {genre.name}
                    </button>
                  )}
                </div>
              </span>
            </div>
            
            <div className="Description">
              <hr />
              <h2 className="Overview">
                {detailsMovie.overview}
              </h2>
            </div>
            
            <div className="Trailer">
              <iframe src={`https://youtube.com/embed/${trailer.key}`} target="_parent" frameborder="0" title="trailer" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
              </iframe>
            </div>
            
            <div className="AllTab">
              <Tabs defaultIndex={0} className="Tabs">
                <TabList className="TabList">
                 <Tab onClick={handleTab1} className={activeTab === "tab1" ? "active" : "false"}>Characters</Tab>
                 <Tab onClick={handleTab2} className={activeTab  === "tab2" ? "active" : "false"}>Similar</Tab>
                </TabList>
                <TabPanel className="TabPanel">
                  <Whirligig className="Whirligig" visibleSlides={6} gutter="1em">
                    {characters.map((Character) => (
                      <div key={Character.id}>
                        <img src={`${Image_path}` ? `${Image_path}${Character.profile_path}` : `${Image_Error}`} alt={Character.name}/>
                        <p>{Character.name}</p>
                      </div>
                    ))}
                  </Whirligig>
                </TabPanel>
                <TabPanel className="TabPanel">
                  <Whirligig className="Whirligig" visibleSlides={6} gutter="1em">
                    {movieSimilar.map((similar) => (
                      <Link to={`/${similar.id}`} replace>
                        <div key={similar.id}> 
                          <img src={`${Image_path}` ? `${Image_path}${similar.poster_path}` : `${Image_Error}`} alt={similar.title}/>
                          <p>{similar.title}</p>
                        </div>
                      </Link>
                    ))}
                  </Whirligig>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
      </>
    );
    
};