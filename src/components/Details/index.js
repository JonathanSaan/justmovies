import { useState, useEffect, useRef } from "react";

import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IoIosStar } from "react-icons/io";
import { motion } from "framer-motion";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import APIKey from "../../mocks/api";
import { Header } from "../Header";
import "./style.scss";



export const Details = () => {
  
  const navigate = useNavigate();
  
  const { details } = useParams();
  
  const [ detailsMovie, setDetailsMovie ] = useState([]);
  const [ yearMovie, setYearMovie ] = useState([]);
  const [ genres, setGenres ] = useState([]);
  const [ trailer, setTrailer ] = useState([]);
  
  const CharactersCarousel = useRef();
  const SimilarCarousel = useRef();
  const [charactersWidth, setCharactersWidth] = useState(0);
  const [movieSimilarWidth, setMovieSimilarWidth] = useState(0);

  const [ activeTab, setActiveTab ] = useState("tab1");
  const handleTab1 = () => {
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    setActiveTab("tab2");
  };
 
 
  const [ characters, setCharacters ] = useState([]);
  const [ movieSimilar, setMovieSimilar ] = useState([]);
  
  const refreshPage = () => {
    
    setTimeout(()=>{
        window.location.reload(false);
    }, 500);
    console.log("page to reload");
  };
  
  const [ loading, setLoading ] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(SimilarCarousel)
    console.log(CharactersCarousel)
    setMovieSimilarWidth(SimilarCarousel.current?.scrollWidth - SimilarCarousel.current?.offsetWidth);
    setCharactersWidth(CharactersCarousel.current?.scrollWidth - CharactersCarousel.current?.offsetWidth);
    
    setTimeout(() => { 
      const load = async () => {
        const respost = await axios.get(`https://api.themoviedb.org/3/movie/${details}?api_key=${APIKey}&language=en-US`);
        setDetailsMovie(respost.data);
        setGenres(respost.data.genres);
        setYearMovie(respost.data.release_date.slice(0, 4));
        
        const videos = await axios.get(`https://api.themoviedb.org/3/movie/${details}/videos?api_key=${APIKey}&language=en-US&append_to_response=videos`);
        
        const stateVideo = () => {
          if (videos.data.results.length > 0) {
            return setTrailer(videos.data.results[0]);
          };
          return null;
        };
        stateVideo();
        
        const dataSimilar = await axios.get(`https://api.themoviedb.org/3/movie/${details}/similar?api_key=${APIKey}&language=en-US&page=1`);
        setMovieSimilar(dataSimilar.data.results);
        
        const credits = await axios.get(`https://api.themoviedb.org/3/movie/${details}/credits?api_key=${APIKey}&language=en-US`);
        setCharacters(credits.data.cast);
        setLoading(true);
      };
      load();
    }, 1000);
  }, [] );
  
  const styleSkeleton = {
    marginLeft: '-18px'
  };
  
  
  const imagePath = "https://image.tmdb.org/t/p/w500";
  const imageError = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHowX2RIOXDQtQ6EWW7zJ_RC8xhiSsXNihA&usqp=CAU";

  
  return (
    <>
      <Header />
      <div className="Details">
        <div className="BackDrop" style={{backgroundImage: `url(${imagePath}${detailsMovie.backdrop_path})`}}>
        </div>
        
        <div className="ContainerDetails">
          <div className="MovieDetails">
            <div className="Image">
              {detailsMovie.poster_path && 
                <img className="PrincipalImage" src={detailsMovie.poster_path ? imagePath + detailsMovie.poster_path : imageError} alt={detailsMovie.title} />
              }
              
              {!detailsMovie.poster_path && !loading &&
                 <Skeleton className="PrincipalImage" style={styleSkeleton} variant="rectangular" />
              }
            </div>
            <span>
              <h1 className="TitleMovie">
                {detailsMovie.title || <Skeleton style={styleSkeleton} variant="text" count={2}/>}
              </h1>
              <p className="ReleaseDate">
                {yearMovie}
              </p>
              <hr />
              
              <div className="Votes">
                <IoIosStar className="Star" size={15} color="yellow"/>
                <p className="vote">
                  {detailsMovie.vote_average}
                </p>
              </div>
              <hr />
              
              <div className="Genres">
                {genres.map((genre) => 
                  <Link to={`/genre/${genre.id}/${genre.name.replaceAll(" ", "-").toLowerCase()}`} >
                    <button className="genre">
                      {genre.name}
                    </button>
                  </Link>
                )}
              </div>
            </span>
          </div>
          
          <div className="Description">
            <hr />
            <h2 className="Overview">
              {detailsMovie.overview || <Skeleton count={5} />}
            </h2>
          </div>
          
          <div className="Trailer">
            {trailer.key && 
              <iframe className="Video" src={"https://youtube.com/embed/" + trailer.key } target="_parent" frameborder="0" title="trailer" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
              </iframe> 
            }
            
            {!trailer.key && !loading &&
              <Skeleton className="Video" variant="rectangular" />
            }
          </div>
          
          <div className="AllTab">
            <Tabs defaultIndex={0} className="Tabs">
              <TabList className="TabList">
               <Tab onClick={handleTab1} className={activeTab === "tab1" ? "active" : "false"}>Characters</Tab>
               <Tab onClick={handleTab2} className={activeTab  === "tab2" ? "active" : "false"}>Similar</Tab>
              </TabList>
              <TabPanel className="TabPanel">
                <motion.div
                  ref={CharactersCarousel}
                  className="carousel"
                  whileTap={{ cursor: "grabbing" }}
                >
                  <motion.div
                    className="inner"
                    drag="x"
                    dragConstraints={{ right: 0, left: -charactersWidth }}
                  >
                    {characters.map((Character) => (
                      <motion.div key={Character.id}>
                        <img src={Character.profile_path ? imagePath + Character.profile_path : imageError} alt={Character.name}/>
                        <p>{Character.name}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </TabPanel>
              
              <TabPanel className="TabPanel">
                <motion.div
                  ref={SimilarCarousel}
                  className="carousel"
                  whileTap={{ cursor: "grabbing" }}
                >
                  <motion.div
                    className="inner"
                    drag="x"
                    dragConstraints={{ right: 0, left: -movieSimilarWidth }}
                  >
                    {movieSimilar.map((similar) => (
                      <motion.div onClick={() => {navigate(`/${similar.id}`); refreshPage() }} key={similar.id}> 
                        <img src={similar.poster_path ? imagePath + similar.poster_path : imageError} alt={similar.title}/>
                        <p>{similar.title}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};