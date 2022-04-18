import Fade from 'react-reveal/Fade';
import Slider from "react-slick";
import { Link } from "react-router-dom";

import "./style.scss";

import { Header } from "../Header";


export const Home = () => {
  
  var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
            infinite: false,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
  }
    
  return (
    <>
      <Header />
      <div className="Home">
        <Fade bottom>
          <h1>Popular</h1>
        </Fade>
        <Slider className="Popular" {...settings}>
          <div>
            <img src="https://br.web.img2.acsta.net/medias/nmedia/18/89/43/82/20052140.jpg" />
            <h1 className="MovieTitle">Os Vingadores</h1>
          </div>
          <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTPfC5xjSPKp32d2qGVze0F4fihyAhuI6teA&usqp=CAU"/>
            <h1 className="SerieTitle">Cavaleiro da lua</h1>
          </div>
          <div>
            <img src="https://br.web.img2.acsta.net/medias/nmedia/18/89/43/82/20052140.jpg" />
            <h1 className="MovieTitle">Os Vingadores</h1>
          </div>
          <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTPfC5xjSPKp32d2qGVze0F4fihyAhuI6teA&usqp=CAU"/>
            <h1 className="SerieTitle">Cavaleiro da lua</h1>
          </div>
          <div>
            <img src="https://br.web.img2.acsta.net/medias/nmedia/18/89/43/82/20052140.jpg" />
            <h1 className="MovieTitle">Os Vingadores</h1>
          </div>
          <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTPfC5xjSPKp32d2qGVze0F4fihyAhuI6teA&usqp=CAU"/>
            <h1 className="SerieTitle">Cavaleiro da lua</h1>
          </div>
        </Slider>
        <Fade bottom>
          <h1>New Movies</h1>
        </Fade>
        <div className="NewMovie">
          <div className="Movies">
            <img src="https://br.web.img2.acsta.net/medias/nmedia/18/89/43/82/20052140.jpg" />
            <h1 className="MovieTitle">Os Vingadores</h1>
          </div>
          <div className="Movies">
            <img src="https://br.web.img2.acsta.net/medias/nmedia/18/89/43/82/20052140.jpg" />
            <h1 className="MovieTitle">Os Vingadores</h1>
          </div>
          <div className="Movies">
            <img src="https://br.web.img2.acsta.net/medias/nmedia/18/89/43/82/20052140.jpg" />
            <h1 className="MovieTitle">Os Vingadores</h1>
          </div>
          <div className="Movies">
            <img src="https://br.web.img2.acsta.net/medias/nmedia/18/89/43/82/20052140.jpg" />
            <h1 className="MovieTitle">Os Vingadores</h1>
          </div>
          <div className="Movies">
            <img src="https://br.web.img2.acsta.net/medias/nmedia/18/89/43/82/20052140.jpg" />
            <h1 className="MovieTitle">Os Vingadores</h1>
          </div>
          <div className="Movies">
            <img src="https://br.web.img2.acsta.net/medias/nmedia/18/89/43/82/20052140.jpg" />
            <h1 className="MovieTitle">Os Vingadores</h1>
          </div>
        </div>
        <Fade bottom>
        <h1>New Series </h1>
        </Fade>
        <div className="NewSeries">
          <div className="Series">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTPfC5xjSPKp32d2qGVze0F4fihyAhuI6teA&usqp=CAU"/>
            <h1 className="SerieTitle">Cavaleiro da lua</h1>
          </div>
          <div className="Series">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTPfC5xjSPKp32d2qGVze0F4fihyAhuI6teA&usqp=CAU"/>
            <h1 className="SerieTitle">Cavaleiro da lua</h1>
          </div>
          <div className="Series">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTPfC5xjSPKp32d2qGVze0F4fihyAhuI6teA&usqp=CAU"/>
            <h1 className="SerieTitle">Cavaleiro da lua</h1>
          </div>
          <div className="Series">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTPfC5xjSPKp32d2qGVze0F4fihyAhuI6teA&usqp=CAU"/>
            <h1 className="SerieTitle">Cavaleiro da lua</h1>
          </div>
          <div className="Series">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTPfC5xjSPKp32d2qGVze0F4fihyAhuI6teA&usqp=CAU"/>
            <h1 className="SerieTitle">Cavaleiro da lua</h1>
          </div>
          <div className="Series">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTPfC5xjSPKp32d2qGVze0F4fihyAhuI6teA&usqp=CAU"/>
            <h1 className="SerieTitle">Cavaleiro da lua</h1>
          </div>
        </div>
      </div>
    </>
  );
    
};