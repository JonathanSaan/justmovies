import Whirligig from "react-whirligig";

export const Popular = ({ slideIndex }) => {
 
 return (
  <>
    <Whirligig visibleSlides={5} gutter="1rem" slideTo={slideIndex}>
          <div>
            <img src="https://br.web.img2.acsta.net/medias/nmedia/18/89/43/82/20052140.jpg" />
            <h1 className="PopularTitle">Os Vingadores</h1>
          </div>
          <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTPfC5xjSPKp32d2qGVze0F4fihyAhuI6teA&usqp=CAU"/>
            <h1 className="PopularTitle">Cavaleiro da lua</h1>
          </div>
          <div>
            <img src="https://br.web.img2.acsta.net/medias/nmedia/18/89/43/82/20052140.jpg" />
            <h1 className="PopularTitle">Os Vingadores</h1>
          </div>
          <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTPfC5xjSPKp32d2qGVze0F4fihyAhuI6teA&usqp=CAU"/>
            <h1 className="PopularTitle">Cavaleiro da lua</h1>
          </div>
          <div>
            <img src="https://br.web.img2.acsta.net/medias/nmedia/18/89/43/82/20052140.jpg" />
            <h1 className="PopularTitle">Os Vingadores</h1>
          </div>
          <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTPfC5xjSPKp32d2qGVze0F4fihyAhuI6teA&usqp=CAU"/>
            <h1 className="PopularTitle">Cavaleiro da lua</h1>
          </div>
      </Whirligig>
    </>
  );

};