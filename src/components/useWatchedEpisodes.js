import { useEffect, useState } from "react";

const STORAGE_KEY = "cineverse:watched:v2";

const readAll = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.error("Não foi possível ler os episódios assistidos", error);
    return {};
  }
};

const episodeKey = (season, episode) => {
  return `${season}-${episode}`;
};

const useWatchedEpisodes = (seriesId) => {
  const [allWatched, setAllWatched] = useState(readAll);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allWatched));
  }, [allWatched]);

  const watchedForSeries = allWatched[seriesId] || {};

  const isWatched = (season, episode) => {
    return !!watchedForSeries[episodeKey(season, episode)];
  };

  const toggleEpisode = (season, episode) => {
    setAllWatched((current) => {
      const forSeries = { ...(current[seriesId] || {}) };
      const key = episodeKey(season, episode);
      forSeries[key] = !forSeries[key];
      return { ...current, [seriesId]: forSeries };
    });
  };

  const countWatchedInSeason = (season, episodeNumbers) => {
    return episodeNumbers.filter((ep) => isWatched(season, ep)).length;
  };

  return { watchedForSeries, isWatched, toggleEpisode, countWatchedInSeason };
};

const getWatchedMapFor = (seriesId) => {
  const all = readAll();
  return all[seriesId] || {};
};

const isEpisodeWatched = (seriesId, season, episode) => {
  const map = getWatchedMapFor(seriesId);
  return !!map[episodeKey(season, episode)];
};

export { useWatchedEpisodes, getWatchedMapFor, isEpisodeWatched };
