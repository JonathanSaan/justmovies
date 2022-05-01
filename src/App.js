import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home } from "./components/Home";
import { Categories } from "./components/Categories";
import { Search } from "./components/Search";
import { Details } from "./components/Details";

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/search/:searched" element={<Search />} />
        <Route path="/:details" element={<Details />} />
        <Route path="/Categories" element={<Categories />} />
      </Routes>
    </Router>
  );
  
};

export default App;