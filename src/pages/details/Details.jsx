import React from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import { Link } from "react-scroll";
import { PlayIcon } from "./PlayBtn";
import { Helmet } from "react-helmet";
import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";
import VidSrcPlayer from "../../components/vidSrcPlayer/VidSrcPlayer";
import TVShowDetails from "../tvShowDetails/TVShowDetails";


const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );


  return (
    <div>
      <Helmet>
        <title>Details - IMovix</title>
        <meta name="description" content="Welcome to the details page of IMovix. Discover and watch free trending, popular, and top-rated content." />
        <meta name="keywords" content="home, trending, popular, top-rated,Imovix, watch free movies" />
        <link rel="canonical" href="/details" />
      </Helmet>
      <div className="banner-container">
        <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      </div>
      <Cast data={credits?.cast} loading={creditsLoading} />
      {/* <VideosSection data={data} loading={loading} /> */}
      <div id="vidSrcPlayer">
        {mediaType === "tv" ? (
          <TVShowDetails mediaType={mediaType} id={id} />
        ) : (
          <VidSrcPlayer mediaType={mediaType} id={id} />
        )}
     
      </div>
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
      
    </div>
  );
};

export default Details;
