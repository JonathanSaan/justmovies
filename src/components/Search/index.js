import { Header } from "../Header"


export const Search = ({ search }) => {
  
  return (
      <>
        <Header />
        <div>
          <h1>Você procurou por {search}</h1>
        </div>
      </>
    );
    
};