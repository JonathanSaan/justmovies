import Fade from 'react-reveal/Fade';

import "./style.scss";

import { Header } from "../Header";
import { Movies } from "./Contents/Movies";
import { Series } from "./Contents/Series";
import { Popular } from "./Contents/Popular";


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