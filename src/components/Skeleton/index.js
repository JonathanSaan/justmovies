import Slider from "react-slick";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const SkeletonHomePopular = ({ popularcarouselsetting }) => {
    return (
        <Slider {...popularcarouselsetting} className="home_container_popular">
            {Array(20).fill(1).map(() => (
                <div className="home_container_popular_card">
                    <Skeleton className="home_container_popular_card-image" variant="rectangular" />
                    <Skeleton className="home_container_popular_card-title" variant="text" count={1} />
                </div>
            ))}
        </Slider>
    );
};
export const SkeletonHomeMovies = () => {
    return (
        <>
            {Array(12).fill(1).map(() => (
                <div className="home_container_newmovie_card">
                    <Skeleton className="home_container_newmovie_card-image" variant="rectangular" />
                    <Skeleton className="home_container_newmovie_card-title" variant="text" count={1} />
                </div>
            ))}
        </>
    );
};
export const SkeletonHomeTopRated = () => {
    return (
        <>
            {Array(12).fill(1).map(() => (
                <div className="home_container_ratedmovie_card">
                    <Skeleton className="home_container_ratedmovie_card-image" variant="rectangular" />
                    <Skeleton className="home_container_ratedmovie_card-title" variant="text" count={1} />
                </div>
            ))}
        </>
    );
};


export const SkeletonMoviesGenre = () => {
    return (
        <>
            {Array(18).fill(1).map(() => (
                <div className="genre_containergenre_card">
                    <Skeleton className="genre_containergenre_card-image" variant="rectangular" />
                    <Skeleton className="genre_containergenre_card-title" variant="text" count={1} />
                </div>
            ))}
        </>
    );
};

export const SkeletonNewMovies = () => {
    return (
        <>
            {Array(18).fill(1).map(() => (
                <div className="newmovies_container_card">
                    <Skeleton className="newmovies_container_card-image" variant="rectangular" />
                    <Skeleton className="newmovies_container_card-title" variant="text" count={1} />
                </div>
            ))}
        </>
    );
};

export const SkeletonTopRated = () => {
    return (
        <>
            {Array(18).fill(1).map(() => (
                <div className="ratedmovie_container_card">
                    <Skeleton className="ratedmovie_container_card-image" variant="rectangular" />
                    <Skeleton className="ratedmovie_container_card-title" variant="text" count={1} />
                </div>
            ))}
        </>
    );
};