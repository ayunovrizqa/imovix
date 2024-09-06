import React from "react";
import { Helmet } from 'react-helmet';
import "./style.scss";

const ContentWrapper = ({ children }) => {
    return <div className="contentWrapper">
         <Helmet>
        <title>IMovix</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Explore and watch thousands of movies, TV shows, and more for free" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.imovix.online" />
        <meta property="og:site_name" content="Free Movie Streaming Website" />
        <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
        {children}</div>;
};

export default ContentWrapper;


