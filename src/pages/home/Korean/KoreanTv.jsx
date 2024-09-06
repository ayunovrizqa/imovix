import React, { useState } from "react";
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";


const KoreanTv = () => {
    const [endpoint, setEndpoint] = useState("day");

    const { data, loading } = useFetch(`/discover/tv?with_networks=866&language=en-US`);

   
    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">K-drama</span>
                
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint="tv" />
        </div>
    );
};

export default KoreanTv;
