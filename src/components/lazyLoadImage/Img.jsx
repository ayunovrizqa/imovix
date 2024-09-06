import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Img = ({ src = '', alt = '', className = '', lazyEffect = 'blur' }) => (
    <LazyLoadImage
        className={className}
        alt={alt}
        effect={lazyEffect}
        src={typeof src === 'string' ? src : ''}
    />
);

export default Img;
