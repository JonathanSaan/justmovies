import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Header } from "./components/Header"
import { Search } from "./components/Search"
import { Home } from "./components/Home"

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/Search' element={<Search />} />
      </Routes>
    </Router>
  );
  
};

export default App;