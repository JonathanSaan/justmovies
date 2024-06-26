import { useState, useEffect } from "react";

import { useParams, Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";

import Header from "../../components/Header";
import resetComponents from "../../utils/ResetComponents";
import { SkeletonProfile } from "../../components/Skeleton";
import "./style.scss";

const Profile = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_BACK_URL}/profile/${username}`);
        setProfileData(response.data.user);
      } catch (err) {
        resetComponents(() => setProfileData());
      }
      setLoading(false);
    };
    load();
  }, [username]);
  
  return (
    <HelmetProvider>
      <Header />
      <Helmet>
        <title>{username}'s Profile - justmovies</title>
        <meta name="description" content={`Check out ${username}'s profile on justmovies. View their favorite movies and more!`} />
        <meta name="keywords" content={`profile, ${username}, favorite movies, ${username}'s profile`} />
      </Helmet>
      <main className="profile">
        {loading ? (
          <SkeletonProfile />
        ) : profileData ? (
          <div className="profile_container">
            <div className="profile_container_details">
              <img
                className="profile_container_details-image"
                src={profileData.avatar}
                alt={`Avatar's ${profileData.name ? `${profileData.username}` : "user"}`}
              />
              <div className="profile_container_details_detail">
                <h1 className="profile_container_details_detail-title">
                  {profileData.username}
                </h1>
                <p className="profile_container_details_detail-description">
                  "{profileData.description}"
                </p>
              </div>
            </div>
            <div className="profile_container_favorites">
              <h2 className="profile_container_favorites-title">Movies favorites ({profileData.favorites.length})</h2>
              <div className="profile_container_favorites_container">
                {profileData.favorites.map((favorite) => ( 
                  <div key={favorite.id} className="profile_container_favorites_container_item">
                    <Link to={`/movies/${favorite.movieId}`}>
                      <img className="profile_container_favorites_container_item-image" src={favorite.movieImage} alt={favorite.movieTitle} />
                    </Link>
                    <Link to={`/movies/${favorite.movieId}`}>
                      <h3 className="profile_container_favorites_container_item-title">{favorite.movieTitle}</h3>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="profile_noFound">
            <h1>Profile no found</h1>
          </div>
        )}
      </main>
    </HelmetProvider>
  );
};

export default Profile;
