import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { getSeasonDetails } from "../components/tmdb.js";
import { useWatchedEpisodes } from "../components/useWatchedEpisodes.js";
import EpisodeItem from "../components/EpisodeItem.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import Loader from "../components/Loader.jsx";
import EmptyState from "../components/EmptyState.jsx";
import "./SeasonPage.css";

const SeasonPage = () => {
  const { id, temporada } = useParams();
  const [season, setSeason] = useState(null);
  const [status, setStatus] = useState("loading");

  const { isWatched, toggleEpisode, countWatchedInSeason } =
    useWatchedEpisodes(id);

  useEffect(() => {
    let active = true;
    setStatus("loading");

    getSeasonDetails(id, temporada)
      .then((data) => {
        if (!active) return;
        setSeason(data);
        setStatus("success");
      })
      .catch((error) => {
        console.error(error);
        if (active) setStatus("error");
      });

    return () => {
      active = false;
    };
  }, [id, temporada]);

  if (status === "loading") {
    return (
      <div className="container">
        <Loader label="Carregando episódios..." />
      </div>
    );
  }

  if (status === "error" || !season) {
    return (
      <div className="container">
        <EmptyState title="Não foi possível carregar esta temporada" />
      </div>
    );
  }

  const episodeNumbers = (season.episodes || []).map((ep) => ep.episode_number);
  const watchedCount = countWatchedInSeason(temporada, episodeNumbers);

  return (
    <div className="container season-page">
      <Link to={`/serie/${id}`} className="link-quiet season-page__back">
        <FiArrowLeft aria-hidden="true" /> Voltar para a série
      </Link>

      <div className="section-head">
        <h2>{season.name}</h2>
      </div>

      <div className="season-page__progress">
        <ProgressBar watched={watchedCount} total={episodeNumbers.length} />
      </div>

      <ul className="episode-list">
        {(season.episodes || []).map((episode) => (
          <EpisodeItem
            key={episode.id}
            episode={episode}
            watched={isWatched(temporada, episode.episode_number)}
            onToggle={() => toggleEpisode(temporada, episode.episode_number)}
          />
        ))}
      </ul>
    </div>
  );
};

export default SeasonPage;
