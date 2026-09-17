import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiBookmark, FiCheckCircle } from "react-icons/fi";
import {
  getSeasonDetails,
  getSeriesDetails,
  IMAGE_BASE,
} from "../components/tmdb.js";
import { useTrackedShows } from "../components/useTrackedShows.js";
import { getWatchedMapFor } from "../components/useWatchedEpisodes.js";
import Loader from "../components/Loader.jsx";
import EmptyState from "../components/EmptyState.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import "./MyShowsPage.css";

const findNextUnwatched = (seriesDetails, watchedMap) => {
  const seasons = (seriesDetails.seasons || [])
    .filter((season) => season.season_number !== 0 && season.episode_count > 0)
    .sort((a, b) => a.season_number - b.season_number);

  let totalEpisodes = 0;
  let watchedEpisodes = 0;

  seasons.forEach((season) => {
    for (let episode = 1; episode <= season.episode_count; episode += 1) {
      totalEpisodes += 1;

      if (watchedMap[`${season.season_number}-${episode}`]) {
        watchedEpisodes += 1;
      }
    }
  });

  let nextEpisode = null;

  seasons.forEach((season) => {
    for (let episode = 1; episode <= season.episode_count; episode += 1) {
      const key = `${season.season_number}-${episode}`;

      if (!watchedMap[key] && !nextEpisode) {
        nextEpisode = {
          seasonNumber: season.season_number,
          episodeNumber: episode,
        };
      }
    }
  });

  if (nextEpisode) {
    return {
      ...nextEpisode,
      totalEpisodes,
      watchedEpisodes,
    };
  }

  return {
    seasonNumber: null,
    episodeNumber: null,
    totalEpisodes,
    watchedEpisodes,
  };
};

const MyShowsPage = () => {
  const { trackedList, untrackShow } = useTrackedShows();
  const [progressById, setProgressById] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (trackedList.length === 0) {
      setStatus("success");
      return;
    }

    let active = true;
    setProgressById([]);
    setStatus("loading");

    let completed = 0;

    trackedList.forEach((show) => {
      getSeriesDetails(show.id)
        .then((details) => {
          const watchedMap = getWatchedMapFor(show.id);
          const next = findNextUnwatched(details, watchedMap);

          if (!next.seasonNumber) {
            return {
              ...next,
              nextEpisodeName: null,
            };
          }

          return getSeasonDetails(show.id, next.seasonNumber).then((season) => {
            const episode = (season.episodes || []).find(
              (item) => item.episode_number === next.episodeNumber
            );

            return {
              ...next,
              nextEpisodeName: episode ? episode.name : null,
            };
          });
        })
        .then((progress) => {
          if (!active) return;

          setProgressById((current) => [
            ...current.filter((item) => item.id !== show.id),
            { id: show.id, ...progress },
          ]);

          completed += 1;
          if (completed === trackedList.length) {
            setStatus("success");
          }
        })
        .catch((error) => {
          console.error(error);
          if (active) setStatus("error");
        });
    });

    return () => {
      active = false;
    };
  }, [trackedList.map((show) => show.id).join(",")]);

  if (status === "loading") {
    return (
      <div className="container">
        <Loader label="Carregando seu progresso..." />
      </div>
    );
  }

  if (trackedList.length === 0) {
    return (
      <div className="container">
        <EmptyState
          icon={<FiBookmark />}
          title="Você ainda não acompanha nenhuma série"
          description="Busque uma série e clique em “Acompanhar série” para vê-la aqui."
          action={
            <Link to="/" className="btn btn-primary">
              Descobrir séries
            </Link>
          }
        />
      </div>
    );
  }

  if (status === "error" && progressById.length === 0) {
    return (
      <div className="container">
        <EmptyState
          title="Não foi possível carregar seu progresso"
          description="Tente novamente mais tarde."
        />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="section-head">
        <h2>Minha lista</h2>
      </div>

      <ul className="my-shows">
        {trackedList.map((show) => {
          const progress = progressById.find((item) => item.id === show.id);
          const finished = progress && progress.seasonNumber === null;

          return (
            <li key={show.id} className="my-shows__item">
              <Link to={`/serie/${show.id}`} className="my-shows__poster">
                {show.poster_path ? (
                  <img
                    src={`${IMAGE_BASE}${show.poster_path}`}
                    alt={`Pôster de ${show.name}`}
                  />
                ) : (
                  <div className="my-shows__placeholder">{show.name}</div>
                )}
              </Link>

              <div className="my-shows__info">
                <Link to={`/serie/${show.id}`}>
                  <h3>{show.name}</h3>
                </Link>

                {progress && (
                  <ProgressBar
                    watched={progress.watchedEpisodes}
                    total={progress.totalEpisodes}
                  />
                )}

                {finished && (
                  <p className="my-shows__done">
                    <FiCheckCircle aria-hidden="true" /> Você está em dia!
                  </p>
                )}

                {progress && !finished && (
                  <Link
                    to={`/serie/${show.id}/temporada/${progress.seasonNumber}`}
                    className="my-shows__next"
                  >
                    Assistir a seguir: T{progress.seasonNumber} · E
                    {progress.episodeNumber < 10
                      ? `0${progress.episodeNumber}`
                      : progress.episodeNumber}
                    {progress.nextEpisodeName
                      ? ` — ${progress.nextEpisodeName}`
                      : ""}
                  </Link>
                )}
              </div>

              <button
                type="button"
                className="btn btn-ghost btn-danger my-shows__remove"
                onClick={() => untrackShow(show.id)}
              >
                Remover
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MyShowsPage;
