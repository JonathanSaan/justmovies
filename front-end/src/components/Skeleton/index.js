import { useState } from "react";

import Skeleton from "@mui/material/Skeleton";
import { Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import breakpoints from "../../mocks/breakpoints_carousel";

export const SkeletonHomeMovies = () => {
  return (
    <>
      {Array(12)
        .fill(1)
        .map((skeleton, index) => (
          <div className="home_container_newmovie_card" key={index}>
            <Skeleton
              className="home_container_newmovie_card-image"
              variant="rectangular"
              sx={{ bgcolor: "grey.800" }}
            />
            <Skeleton
              className="home_container_newmovie_card-title"
              variant="text"
              sx={{ bgcolor: "grey.800" }}
              height={30}
            />
          </div>
        ))}
    </>
  );
};
export const SkeletonHomeTopRated = () => {
  return (
    <>
      {Array(12)
        .fill(1)
        .map((skeleton, index) => (
          <div className="home_container_ratedmovie_card" key={index}>
            <Skeleton
              className="home_container_ratedmovie_card-image"
              variant="rectangular"
              sx={{ bgcolor: "grey.800" }}
            />
            <Skeleton
              className="home_container_ratedmovie_card-title"
              variant="text"
              height={30}
              sx={{ bgcolor: "grey.800" }}
            />
          </div>
        ))}
    </>
  );
};

export const SkeletonMoviesGenre = () => {
  return (
    <>
      {Array(18)
        .fill(1)
        .map((skeleton, index) => (
          <div className="genre_containergenre_card" key={index}>
            <Skeleton
              className="genre_containergenre_card-image"
              variant="rectangular"
              sx={{ bgcolor: "grey.800" }}
            />
            <Skeleton
              className="genre_containergenre_card-title"
              variant="text"
              sx={{ bgcolor: "grey.800" }}
              height={30}
            />
          </div>
        ))}
    </>
  );
};

export const SkeletonNewMovies = () => {
  return (
    <>
      {Array(18)
        .fill(1)
        .map((skeleton, index) => (
          <div className="newmovies_container_card" key={index}>
            <Skeleton
              className="newmovies_container_card-image"
              variant="rectangular"
              sx={{ bgcolor: "grey.800" }}
            />
            <Skeleton
              className="newmovies_container_card-title"
              variant="text"
              sx={{ bgcolor: "grey.800" }}
              height={30}
            />
          </div>
        ))}
    </>
  );
};

export const SkeletonTopRated = () => {
  return (
    <>
      {Array(18)
        .fill(1)
        .map((skeleton, index) => (
          <div className="ratedmovie_container_card" key={index}>
            <Skeleton
              className="ratedmovie_container_card-image"
              variant="rectangular"
              sx={{ bgcolor: "grey.800" }}
            />
            <Skeleton
              className="ratedmovie_container_card-title"
              variant="text"
              sx={{ bgcolor: "grey.800" }}
              height={30}
            />
          </div>
        ))}
    </>
  );
};

export const SkeletonMovieDetails = () => {
  const [activeTab, setActiveTab] = useState("1");
  const handleTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="details_container">
      <div className="details_container_movie">
        <Skeleton
          className="details_container_movie-image"
          variant="rectangular"
          sx={{ bgcolor: "grey.800" }}
        />

        <span className="details_container_movie-details">
          <Skeleton
            className="details_container_movie-details-title"
            variant="text"
            sx={{ bgcolor: "grey.800" }}
            height={40}
          />
          <Skeleton
            className="details_container_movie-details-releasedate"
            variant="text"
            sx={{ bgcolor: "grey.800" }}
            height={30}
          />
        </span>
      </div>

      <div className="details_container_movie-synopsis">
        {Array(8).fill(1).map((skeleton, index) => (
          <Skeleton
            className="details_container_movie-synopsis-paragraph"
            key={index}
            variant="text"
            sx={{ bgcolor: "grey.800", margin: "-.3rem 0" }}
            height={30}
          />
        ))}
      </div>

      <div className="details_container_movie-containervideo">
        <Skeleton
          className="details_container_movie-containervideo-video"
          variant="rectangular"
          sx={{ bgcolor: "grey.800" }}
        />
      </div>

      <div>
        <TabContext value={activeTab}>
          <TabList 
            TabIndicatorProps={{
              sx: {backgroundColor: "#808080"}
            }}
            sx={{
              color: "#f3f3f3", 
              bgcolor: "#202020",
            }}
            textColor="inherit"
            onChange={handleTab}
          >
            <Tab disableRipple label="Characters" value="1" />
            <Tab disableRipple label="Similar" value="2" />
          </TabList>
          
          <TabPanel value="1" sx={{ padding: "0rem" }}>
            <Swiper
              slidesPerView={2.3}
              spaceBetween={10}
              breakpoints={breakpoints}
              modules={[Navigation]} 
              navigation={true}
              className="carousel1"
            >
              {Array(20).fill(1).map((card, index) => (
                <SwiperSlide className="item" key={index}>
                  <p>
                    <Skeleton 
                      className="item-image" 
                      variant="rectangular" 
                      sx={{ bgcolor: "grey.800" }} 
                    />
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          </TabPanel>

          <TabPanel value="2" sx={{ padding: "0rem" }}>
            <Swiper
              slidesPerView={2.3}
              spaceBetween={10}
              breakpoints={breakpoints}
              modules={[Navigation]}
              navigation={true}
              className="carousel2"
            >
              {Array(20).fill(1).map((card, index) => (
                <SwiperSlide className="item" key={index}>
                  <p>
                    <Skeleton 
                      className="item-image" 
                      variant="rectangular" 
                      sx={{ bgcolor: "grey.800" }} 
                    />
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
};

export const SkeletonProfile = () => {
  return (
    <div className="profile_container">
      <div className="profile_container_details">
        <Skeleton
          className="profile_container_details-image"
          variant="circular"
          sx={{ bgcolor: "grey.800" }}
        />
        <div className="profile_container_details_detail">
          <Skeleton
            className="profile_container_details_detail-title"
            variant="text"
            sx={{ bgcolor: "grey.800", margin: "0 0 -.5rem 0" }}
            height={40}
          />
          <Skeleton
            className="profile_container_details_detail-description"
            variant="text"
            sx={{ bgcolor: "grey.800" }}
            height={25}
          />
        </div>
      </div>
      <div className="profile_container_favorites">
        <h2 className="profile_container_favorites-title">Movies favorites (0)</h2>
      </div>
    </div>
  );
}

export const SkeletonProfileSettings = () => <Skeleton className="settings_form-image" sx={{ bgcolor: "grey.800" }} />;
