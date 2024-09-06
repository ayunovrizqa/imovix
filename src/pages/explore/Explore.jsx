import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
import { Helmet } from "react-helmet";
import "./style.scss";

import useFetch from "../../hooks/useFetch";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";

let filters = {};
const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    { value: "primary_release_date.desc", label: "Release Date Descending" },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];

const languageData = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "hi", label: "Hindi" },
    { value: "ko", label: "Korean" },
    { value: "tr", label: "Turkish" },
    { value: "ar", label: "Arabic" },
    { value: "de", label: "German" },
    { value: "zh", label: "Chinese" },
    { value: "ja", label: "Japanese" },
   
    // Add more languages as needed
];

const regionData = [
    { value: "us", label: "United States", language: "en" },
    { value: "gb", label: "United Kingdom", language: "en" },
    { value: "kr", label: "South Korea", language: "ko" },
    { value: "tr", label: "Turkey", language: "tr" },
    { value: "in", label: "India", language: "hi" },
    { value: "jp", label: "Japan", language: "ja" },
    { value: "ae", label: "United Arab Emirates", language: "ar" },
    { value: "de", label: "Germany", language: "de" },
    { value: "fr", label: "France", language: "fr" },
   
 
    // Add more regions as needed
];

const yearRangeData = [
    { label: "Any", value: { min: null, max: null } },
    { label: "2024", value: { min: "2024-01-01", max: "2024-12-31" } },
    { label: "2023", value: { min: "2023-01-01", max: "2023-12-31" } },
    { label: "2022", value: { min: "2022-01-01", max: "2022-12-31" } },
    { label: "2021", value: { min: "2021-01-01", max: "2021-12-31" } },
    { label: "2020", value: { min: "2020-01-01", max: "2020-12-31" } },
    { label: "2019", value: { min: "2019-01-01", max: "2019-12-31" } },
    { label: "2018", value: { min: "2018-01-01", max: "2018-12-31" } },
    { label: "2017", value: { min: "2017-01-01", max: "2017-12-31" } },
    { label: "2016", value: { min: "2016-01-01", max: "2016-12-31" } },
    { label: "2015", value: { min: "2015-01-01", max: "2015-12-31" } },
    // Add more options as needed
];

const Explore = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState(null);
    const [sortby, setSortby] = useState(null);
    const [yearRange, setYearRange] = useState(null);
    const [language, setLanguage] = useState(null);
    const [region, setRegion] = useState(null);
    const { mediaType } = useParams();

    const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

    const fetchInitialData = () => {
        setLoading(true);
        const queryParams = new URLSearchParams(filters).toString();
        fetchDataFromApi(`/discover/${mediaType}?${queryParams}`).then((res) => {
            setData(res);
            setPageNum((prev) => prev + 1);
            setLoading(false);
        });
    };

    const fetchNextPageData = () => {
        const queryParams = new URLSearchParams(filters).toString();
        fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}&${queryParams}`).then((res) => {
            if (data?.results) {
                setData({
                    ...data,
                    results: [...data?.results, ...res.results],
                });
            } else {
                setData(res);
            }
            setPageNum((prev) => prev + 1);
        });
    };

    useEffect(() => {
        filters = {};
        setData(null);
        setPageNum(1);
        setSortby(null);
        setGenre(null);
        setYearRange(null);
        setLanguage(null);
        setRegion(null);
        fetchInitialData();
    }, [mediaType]);

    const onChange = (selectedItems, action) => {
        if (action.name === "sortby") {
            setSortby(selectedItems);
            if (selectedItems) {
                filters.sort_by = selectedItems.value;
            } else {
                delete filters.sort_by;
            }
        }
    
        if (action.name === "genres") {
            setGenre(selectedItems);
            if (selectedItems) {
                let genreId = selectedItems.map((g) => g.id).join(",");
                filters.with_genres = genreId;
            } else {
                delete filters.with_genres;
            }
        }
    
        if (action.name === "yearRange") {
            setYearRange(selectedItems);
            if (selectedItems) {
                filters["primary_release_date.gte"] = selectedItems.value.min;
                filters["primary_release_date.lte"] = selectedItems.value.max;
            } else {
                delete filters["primary_release_date.gte"];
                delete filters["primary_release_date.lte"];
            }
        }
    
        if (action.name === "language") {
            setLanguage(selectedItems);
            if (selectedItems) {
                filters.with_original_language = selectedItems.value;
            } else {
                delete filters.with_original_language;
            }
        }
    
        if (action.name === "region") {
            setRegion(selectedItems);
            if (selectedItems) {
                filters.region = selectedItems.value;
                // Automatically set the language based on the selected region
                const regionLanguage = selectedItems.language;
                setLanguage(languageData.find(lang => lang.value === regionLanguage));
                filters.with_original_language = regionLanguage;
            } else {
                delete filters.region;
                delete filters.with_original_language;
            }
        }
    
        setPageNum(1);
        fetchInitialData();
    };
    return (
        <div className="explorePage">
            <Helmet>
                <title>Explore - IMovix</title>
                <meta
                    name="description"
                    content="Explore page of IMovix. Watch free trending, popular, and top-rated content."
                />
                <meta
                    name="keywords"
                    content="explore movies, new releases, trending, popular, top-rated, imovix"
                />
                <link
                    rel="canonical"
                    href={`https://www.imovix.online/explore/${mediaType}`}
                />
            </Helmet>
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">
                        {mediaType === "tv"
                            ? "Explore TV Shows"
                            : "Explore Movies"}
                    </div>
                    <div className="filters">
                        <Select
                            isMulti
                            name="genres"
                            value={genre}
                            closeMenuOnSelect={false}
                            options={genresData?.genres}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            onChange={onChange}
                            placeholder="Select genres"
                            className="react-select-container genresDD"
                            classNamePrefix="react-select"
                        />
                        <Select
                            name="sortby"
                            value={sortby}
                            options={sortbyData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Sort by"
                            className="react-select-container sortbyDD"
                            classNamePrefix="react-select"
                        />
                        <Select
                            name="yearRange"
                            value={yearRange}
                            options={yearRangeData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Year Range"
                            className="react-select-container yearRangeDD"
                            classNamePrefix="react-select"
                        />
                        <Select
                            name="language"
                            value={language}
                            options={languageData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Language"
                            className="react-select-container languageDD"
                            classNamePrefix="react-select"
                        />
                        <Select
                            name="region"
                            value={region}
                            options={regionData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Region"
                            className="react-select-container regionDD"
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <>
                        {data?.results?.length > 0 ? (
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data.results.map((item, index) => (
                                    <MovieCard key={index} data={item} mediaType={mediaType} />
                                ))}
                            </InfiniteScroll>
                        ) : (
                            <span className="resultNotFound">Sorry, Results not found!</span>
                        )}
                    </>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Explore;
