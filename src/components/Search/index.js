import { useParams } from "react-router-dom";

import { Header } from "../Header";

import "./style.scss";

export const Search = ({ search }) => {
  
  let { searched } = useParams();
  
  return (
      <>
        <Header />
        <div className="Search">
          <div>
            <h1>You searched for: {searched.replaceAll("+", " ")}</h1>
          </div>
        </div>
      </>
    );
    
};