import { Analytics } from "@vercel/analytics/react";
import { SkeletonTheme } from "react-loading-skeleton";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Error from "./pages/Error";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Apps from "./pages/Apps";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Recovery from "./pages/Recovery";
import NewMovies from "./pages/NewMovies";
import TopRated from "./pages/TopRated";
import Categories from "./pages/Categories";
import MoviesGenre from "./pages/MoviesGenre";
import Search from "./pages/Search";
import MovieDetails from "./pages/MovieDetails";
import ResetPassword from "./pages/ResetPassword";

import PrivateRoute from "./privateRoute";

function App() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/new-movies" element={<NewMovies />} />
          <Route path="/new-movies?page=:page" element={<NewMovies />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/top-rated?page=:page" element={<TopRated />} />
          <Route path="/search" element={<Search />} />
          <Route path="/genre" element={<Categories />} />
          <Route path="/movies/:details" element={<MovieDetails />} />
          <Route path="/genre/:id/:genre" element={<MoviesGenre />} />
          <Route path="/genre/:id/:genre?page=:page" element={<MoviesGenre />} />
          <Route path="/reset-password/id=:id/token=:token" element={<ResetPassword />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
      <Analytics debug={false} />
    </SkeletonTheme>
  );
}

export default App;
