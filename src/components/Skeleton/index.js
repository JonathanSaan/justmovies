import { useState } from "react";

import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import {
  popularcarouselsetting,
  detailscarouselsetting,
} from "../../mocks/carouselsettings";

export const SkeletonHomePopular = () => {
  return (
    <Slider {...popularcarouselsetting} className="home_container_popular">
      {Array(20)
        .fill(1)
        .map(() => (
          <div className="home_container_popular_card">
            <Skeleton
              className="home_container_popular_card-image"
              variant="rectangular"
            />
            <Skeleton
              className="home_container_popular_card-title"
              variant="text"
              count={1}
            />
          </div>
        ))}
    </Slider>
  );
};
export const SkeletonHomeMovies = () => {
  return (
    <>
      {Array(12)
        .fill(1)
        .map(() => (
          <div className="home_container_newmovie_card">
            <Skeleton
              className="home_container_newmovie_card-image"
              variant="rectangular"
            />
            <Skeleton
              className="home_container_newmovie_card-title"
              variant="text"
              count={1}
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
        .map(() => (
          <div className="home_container_ratedmovie_card">
            <Skeleton
              className="home_container_ratedmovie_card-image"
              variant="rectangular"
            />
            <Skeleton
              className="home_container_ratedmovie_card-title"
              variant="text"
              count={1}
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
        .map(() => (
          <div className="genre_containergenre_card">
            <Skeleton
              className="genre_containergenre_card-image"
              variant="rectangular"
            />
            <Skeleton
              className="genre_containergenre_card-title"
              variant="text"
              count={1}
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
        .map(() => (
          <div className="newmovies_container_card">
            <Skeleton
              className="newmovies_container_card-image"
              variant="rectangular"
            />
            <Skeleton
              className="newmovies_container_card-title"
              variant="text"
              count={1}
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
        .map(() => (
          <div className="ratedmovie_container_card">
            <Skeleton
              className="ratedmovie_container_card-image"
              variant="rectangular"
            />
            <Skeleton
              className="ratedmovie_container_card-title"
              variant="text"
              count={1}
            />
          </div>
        ))}
    </>
  );
};

export const SkeletonMovieDetails = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const handleTab = (index) => {
    setActiveTab(`tab${index}`);
  };

  return (
    <div className="details_container">
      <div className="details_container_movie">
        <Skeleton
          className="details_container_movie-image"
          variant="rectangular"
        />

        <span className="details_container_movie-details">
          <Skeleton
            className="details_container_movie-details-title"
            variant="text"
            count={1}
          />
          <Skeleton
            className="details_container_movie-details-releasedate"
            variant="text"
            count={1}
          />
        </span>
      </div>

      <div className="details_container_movie-synopsis">
        <Skeleton
          className="details_container_movie-synopsis-paragraph"
          variant="text"
          count={7}
        />
      </div>

      <div className="details_container_movie-containervideo">
        <Skeleton
          className="details_container_movie-containervideo-video"
          variant="rectangular"
        />
      </div>

      <div className="AllTab">
        <Tabs defaultIndex={0} className="Tabs">
          <TabList className="TabList">
            <Tab
              onClick={() => handleTab(1)}
              className={activeTab === "tab1" ? "active" : "false"}
            >
              Characters
            </Tab>
            <Tab
              onClick={() => handleTab(2)}
              className={activeTab === "tab2" ? "active" : "false"}
            >
              Similar
            </Tab>
          </TabList>
          <TabPanel className="TabPanel">
            <Slider {...detailscarouselsetting} className="carousel1">
              {Array(20)
                .fill(1)
                .map((card, index) => (
                  <div className="item">
                    <Skeleton className="ImageLoading" variant="rectangular" />
                    <Skeleton className="Text" variant="text" count={1} />
                  </div>
                ))}
            </Slider>
          </TabPanel>

          <TabPanel className="TabPanel">
            <Slider {...detailscarouselsetting} className="carousel1">
              {Array(20)
                .fill(1)
                .map((card, index) => (
                  <div className="item">
                    <Skeleton className="ImageLoading" variant="rectangular" />
                    <Skeleton className="Text" variant="text" count={1} />
                  </div>
                ))}
            </Slider>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};
