import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";


const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const topRatedMovies = useFetch("/movie/top_rated");
  const upcomingMovies = useFetch("/movie/upcoming");
  const nowPlayingMovies = useFetch("/movie/now_playing");
  const popularMovies = useFetch("/movie/popular");

  const topRatedTV = useFetch("/tv/top_rated");
  const onTheAirTV = useFetch("/tv/on_the_air");
  const popularTV = useFetch("/tv/popular");

  useEffect(() => {
    const dataSets = [
      topRatedMovies.data,
      upcomingMovies.data,
      nowPlayingMovies.data,
      popularMovies.data,
      topRatedTV.data,
      onTheAirTV.data,
      popularTV.data,
    ];
    const combinedResults = dataSets.reduce((acc, data) => {
      return data ? acc.concat(data.results) : acc;
    }, []);

    if (combinedResults.length > 0) {
      const bg =
        url.backdrop +
        combinedResults[Math.floor(Math.random() * combinedResults.length)]
          ?.backdrop_path;
      setBackground(bg);
    }
  }, [
    topRatedMovies.data,
    upcomingMovies.data,
    nowPlayingMovies.data,
    popularMovies.data,
    topRatedTV.data,
    onTheAirTV.data,
    popularTV.data,
  ]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const searchButtonClickHandler = () => {
    navigate(`/search/${query}`);
  };

  return (
    <>
      <div className="heroBanner">
        {!topRatedMovies.loading &&
          !upcomingMovies.loading &&
          !nowPlayingMovies.loading &&
          !popularMovies.loading &&
          !topRatedTV.loading &&
          !onTheAirTV.loading &&
          !popularTV.loading && (
            <div className="backdrop-img">
              <Img src={background} />
            </div>
          )}
        <div className="opacity-layer"></div>
        <ContentWrapper>
          <div className="heroBannerContent">
            <span className="title">Welcome</span>
            <span className="subTitle">
              Watch and explore Movies, TV shows, Anime and much more all for free.
            </span>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <button onClick={searchButtonClickHandler}>Search</button>
            </div>
             
          </div>
        </ContentWrapper>
      </div>
    </>
  );
};

export default HeroBanner;
