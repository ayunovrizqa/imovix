import "./style.scss";
import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import HeroBanner from "./heroBanner/HeroBanner";
import Trending  from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import TrendingTv from "./trendingTv/TrendingTv";
import NetfixTv from "./netflixTv/NetflixTv";
import AppleTv from "./appleTv/AppleTv";
import AmazonTv from "./amazonTv/AmazonTv";
import HboTv from "./Hbo/HboTv";
import HuluTv from "./Hulu/HuluTv";
import KoreanTv from "./Korean/KoreanTv";
import Anime from "./Anime/Anime";
const Home = () => {
  
  return (
    <div className="homePage">
   
      <Helmet>
        <title>Home - Free Movie Streaming Website</title>
      <meta property="og:title" content="Movie Streaming Website - Home" />
      <meta
        property="og:description"
        content="Watch movies online for free. Stream the latest movies and TV shows, Anime on our platform. No subscription required."
      />
        <link rel="canonical" href="https://www.imovix.online" />
      <meta property="og:image" content="/images/IMOVIX__1.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:title" content="Free Movie Streaming Website - Home" />
      <meta
        name="twitter:description"
        content="Watch movies online for free. Stream the latest movies and TV shows on our platform. No subscription required."
      />
      <meta name="twitter:image" content="/images/IMOVIX__1.png" />
      </Helmet>
      <HeroBanner/>
      <Trending/>
      <TrendingTv/>
      <Popular/>
      <NetfixTv/>
      <KoreanTv/>
      <Anime/>
      <AppleTv/>
      <AmazonTv/>
      <HboTv/>
      <HuluTv/>
      <TopRated/>
    </div>
  );
};

export default Home;
