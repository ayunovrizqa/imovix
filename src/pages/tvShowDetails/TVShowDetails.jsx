import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { fetchDataFromApi } from "../../utils/api";
import VidSrcPlayer from "../../components/vidSrcPlayer/VidSrcPlayer";
import "./style.scss";

const TVShowDetails = () => {
  const { id } = useParams();
  const [seasons, setSeasons] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [episodeDetails, setEpisodeDetails] = useState(null);
  const [loadingSeasons, setLoadingSeasons] = useState(true);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const data = await fetchDataFromApi(`/tv/${id}`);
        const currentDate = new Date();
        const releasedSeasons = data.seasons.filter((season) => {
          const releaseDate = new Date(season.air_date);
          // Exclude specials and future seasons
          return season.season_number !== 0 && releaseDate <= currentDate;
        });
        setSeasons(releasedSeasons);
        setLoadingSeasons(false);
      } catch (error) {
        console.error("Failed to fetch show details:", error);
        setLoadingSeasons(false);
      }
    };

    fetchShowDetails();
  }, [id]);

  useEffect(() => {
    if (selectedSeason) {
      const fetchEpisodes = async () => {
        setLoadingEpisodes(true);
        try {
          const data = await fetchDataFromApi(`/tv/${id}/season/${selectedSeason}`);
          const currentDate = new Date();
          const releasedEpisodes = data.episodes.filter((episode) => {
            const releaseDate = new Date(episode.air_date);
            return releaseDate <= currentDate;
          });
          setEpisodes(releasedEpisodes);
        } catch (error) {
          console.error("Failed to fetch episodes:", error);
        }
        setLoadingEpisodes(false);
      };

      fetchEpisodes();
    }
  }, [id, selectedSeason]);

  useEffect(() => {
    if (selectedEpisode) {
      const episodeDetail = episodes.find((episode) => episode.id === parseInt(selectedEpisode));
      setEpisodeDetails(episodeDetail);
    }
  }, [selectedEpisode, episodes]);

  const handleEpisodeClick = (episodeId) => {
    setSelectedEpisode(episodeId);
  };

  const handleClosePlayer = () => {
    setSelectedEpisode(null);
    setEpisodeDetails(null);
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) return description;
    return description.slice(0, maxLength) + '...';
  };

  return (
    <div>
      <Helmet>
        <title>TV Show Details - IMovix</title>
        <meta
          name="description"
          content="Discover detailed information about your favorite TV shows and watch selected episodes on IMovix."
        />
        <meta name="keywords" content="tv show, details, IMovix, watch episodes" />
        <link rel="canonical" href={`/tv/${id}`} />
      </Helmet>
      <div className="tv-show-details">
        <h1>TV Show Details</h1>
        <div className="content">
          <div className="seasons">
            <h2>Seasons</h2>
            {loadingSeasons ? (
              <p>Loading seasons...</p>
            ) : seasons.length > 0 ? (
              <div className="season-cards">
                {seasons.map((season) => (
                  <div key={season.id} className="season-container">
                    <div
                      className={`season-card ${selectedSeason === season.season_number ? "selected" : ""}`}
                      onClick={() => setSelectedSeason(season.season_number)}
                    >
                      <img src={`https://image.tmdb.org/t/p/w500${season.poster_path}`} alt={season.name} />
                      {/* Remove the season info div if you want to hide the description */}
                      <div className="season-info">
                        <h3>{season.name}</h3>
                      </div> 
                    </div>
                    {selectedSeason === season.season_number && (
                      <div className="episodes">
                        <h2>Episodes</h2>
                        {loadingEpisodes ? (
                          <p>Loading episodes...</p>
                        ) : episodes.length > 0 ? (
                          <div className="episode-dropdown">
                            <select
                              value={selectedEpisode || ""}
                              onChange={(e) => handleEpisodeClick(e.target.value)}
                            >
                              <option value="" disabled>Select an episode</option>
                              {episodes.map((episode) => (
                                <option key={episode.id} value={episode.id}>
                                  {`Episode ${episode.episode_number} - ${episode.name}`}
                                </option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          <p>No episodes available for this season.</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No seasons available.</p>
            )}
          </div>
        </div>
        {episodeDetails && (
          <div className="player-wrapper">
            <button className="close-button" onClick={handleClosePlayer}>X</button>
            <VidSrcPlayer mediaType="tv" id={id} season={selectedSeason} episode={episodeDetails.episode_number} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TVShowDetails;
