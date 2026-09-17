import { useEffect, useState } from "react";

const STORAGE_KEY = "cineverse:tracked:v2";

const readFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const useTrackedShows = () => {
  const [tracked, setTracked] = useState(readFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tracked));
  }, [tracked]);

  const isTracked = (id) => !!tracked.find((show) => show.id === id);

  const trackShow = (series) =>
    setTracked((current) => {
      const found = current.find((show) => show.id === series.id);

      if (found) return current;

      return [
        ...current,
        {
          id: series.id,
          name: series.name,
          poster_path: series.poster_path,
        },
      ];
    });

  const untrackShow = (id) =>
    setTracked((current) => current.filter((show) => show.id !== id));

  return {
    trackedList: tracked,
    isTracked,
    trackShow,
    untrackShow,
  };
};

export { useTrackedShows };
