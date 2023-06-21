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
        const response = await axios.get(`${process.env.REACT_APP_SERVER_BACK_URL }/profile/${username}`);
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
      </Helmet>
      <div className="profile">
        {loading ? (
          <SkeletonProfile />
        ) : profileData ? (
          <div className="profile_container">
            <img
              className="profile_container-image"
              src={profileData.avatar}
              alt="avatar's user"
            />
            <div className="profile_container_detail">
              <h1 className="profile_container_detail-title">
                {profileData.username}
              </h1>
              <h2 className="profile_container_detail-description">
                "{profileData.description}"
              </h2>
            </div>
            <div className="profile_container_favorites">
              <h1 className="profile_container_favorites-title">Movies favorites ({profileData.favorites.length})</h1>
              <div className="profile_container_favorites_container">
                {profileData.favorites.map((favorite) => ( 
                  <div key={favorite.id} className="profile_container_favorites_container-item">
                    <Link to={`/movies/${favorite.movieId}`}>
                      <img src={favorite.movieImage} alt={favorite.movieTitle} />
                    </Link>
                    <Link to={`/movies/${favorite.movieId}`}>
                      <h2>{favorite.movieTitle}</h2>
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
      </div>
    </HelmetProvider>
  );
};

export default Profile;
