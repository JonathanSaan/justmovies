import Fade from 'react-reveal/Fade';

import "./style.scss";

import { Header } from "../Header";
import { Movies } from "./Movies";
import { Series } from "./Series";
import { Popular } from "./Popular";


export const Home = () => {
  
  return (
    <>
      <Header />
      <div className="Home">
        <Fade bottom>
          <h1>Most Popular</h1>
        </Fade>
        <div className="Popular" >
          <Popular/>
        </div>
        <Fade bottom>
          <h1>New Movies</h1>
        </Fade>
        <div className="NewMovie">
          <Movies />
        </div>
        <Fade bottom>
          <h1>New Series </h1>
        </Fade>
        <div className="NewSeries">
          <Series />
        </div>
      </div>
    </>
  );
    
};