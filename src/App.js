import { SkeletonTheme } from "react-loading-skeleton";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home } from "./components/Home";
import { NewMovies } from "./components/NewMovies";
import { TopRated } from "./components/TopRated";
import { Categories } from "./components/Categories";
import { MoviesGenre } from "./components/MoviesGenre";
import { Search } from "./components/Search";
import { Details } from "./components/Details";

function App() {

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/NewMovies" element={<NewMovies />} />
          <Route exact path="/TopRated" element={<TopRated />} />
          <Route path="/search/" element={<Home />} />
          <Route path="/search/:searched" element={<Search />} />
          <Route path="/:details" element={<Details />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:genre" element={<MoviesGenre />} />
        </Routes>
      </Router>
    </SkeletonTheme>
  );
  
};

export default App;