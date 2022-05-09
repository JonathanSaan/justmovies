import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home } from "./components/Home";
import { NewMovies } from "./components/NewMovies";
import { TopRated } from "./components/TopRated";
import { Categories } from "./components/Categories";
import { Search } from "./components/Search";
import { Details } from "./components/Details";

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/NewMovies" element={<NewMovies />} />
        <Route exact path="/TopRated" element={<TopRated />} />
        <Route path="/search/:searched" element={<Search />} />
        <Route path="/:details" element={<Details />} />
        <Route path="/Categories" element={<Categories />} />
      </Routes>
    </Router>
  );
  
};

export default App;
