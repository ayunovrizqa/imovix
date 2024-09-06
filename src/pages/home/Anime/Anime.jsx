import React, { useState } from "react";
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";


const Anime = () => {
    const [endpoint, setEndpoint] = useState("day");

    const { data, loading } = useFetch(`/discover/tv?with_keywords=207826&language=en-US`);

   
    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Anime</span>
                
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint="tv" />
        </div>
    );
};

export default Anime;
