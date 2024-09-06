import React, { useState } from "react";
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";


const NetfixTv = () => {
    const [endpoint, setEndpoint] = useState("day");

    const { data, loading } = useFetch(`/discover/tv?with_networks=213&language=en`);

   
    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Trending shows on Netfix</span>
                
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint="tv" />
        </div>
    );
};

export default NetfixTv;
