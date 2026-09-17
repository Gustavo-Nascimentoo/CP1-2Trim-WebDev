import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const KEY = "cineverse:data:v2";

const initial = {
  watched: [],
  watchlist: [],
  reviews: [],
  comments: [],
  lists: [{ id: "favorites", name: "Favoritos", items: [] }],
  following: ["marina.cine", "rafaelseries"],
  likedReviews: [],
  activity: [],
  spoilerSafe: true,
};

const read = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "{}");

    return {
      ...initial,
      ...saved,
      watched: saved.watched || [],
      watchlist: saved.watchlist || [],
      reviews: saved.reviews || [],
      comments: saved.comments || [],
      lists: saved.lists || initial.lists,
      following: saved.following || initial.following,
      likedReviews: saved.likedReviews || [],
      activity: saved.activity || [],
      spoilerSafe:
        typeof saved.spoilerSafe === "boolean" ? saved.spoilerSafe : true,
    };
  } catch {
    return initial;
  }
};

const save = (data) => localStorage.setItem(KEY, JSON.stringify(data));

const AppDataContext = createContext(null);

const AppDataProvider = ({ children }) => {
  const [data, setData] = useState(read);

  useEffect(() => save(data), [data]);

  const watched = data.watched;

  const toggleWatched = (item) =>
    setData((current) => {
      const found = current.watched.find((media) => media.id === item.id);

      if (found) {
        return {
          ...current,
          watched: current.watched.filter((media) => media.id !== item.id),
        };
      }

      return {
        ...current,
        watched: [...current.watched, { ...item }],
        watchlist: current.watchlist.filter((media) => media.id !== item.id),
        activity: [
          {
            text: `marcou ${item.name || item.title} como assistido`,
          },
          ...current.activity,
        ].slice(0, 20),
      };
    });

  const addWatchlist = (item) =>
    setData((current) => {
      const found = current.watchlist.find((media) => media.id === item.id);

      if (found) return current;

      return {
        ...current,
        watchlist: [item, ...current.watchlist],
      };
    });

  const removeWatchlist = (id) =>
    setData((current) => ({
      ...current,
      watchlist: current.watchlist.filter((item) => item.id !== id),
    }));

  const review = (item, rating, text) =>
    setData((current) => ({
      ...current,
      reviews: [
        {
          id: `r-${Date.now()}`,
          itemId: item.id,
          name: item.name || item.title,
          rating,
          text,
        },
        ...current.reviews,
      ],
    }));

  const removeReview = (id) =>
    setData((current) => ({
      ...current,
      reviews: current.reviews.filter((review) => review.id !== id),
    }));

  const addComment = (comment) =>
    setData((current) => ({
      ...current,
      comments: [
        {
          id: `c${current.comments.length + 1}`,
          ...comment,
        },
        ...current.comments,
      ],
    }));

  const removeComment = (id) =>
    setData((current) => ({
      ...current,
      comments: current.comments.filter((comment) => comment.id !== id),
    }));

  const addList = (name) =>
    setData((current) => ({
      ...current,
      lists: [
        ...current.lists,
        { id: `l${current.lists.length + 1}`, name, items: [] },
      ],
    }));

  const addToList = (listId, item) =>
    setData((current) => ({
      ...current,
      lists: current.lists.map((list) => {
        const found = list.items.find((media) => media.id === item.id);

        if (list.id === listId && !found) {
          return { ...list, items: [...list.items, item] };
        }

        return list;
      }),
    }));

  const removeFromList = (listId, itemId) =>
    setData((current) => ({
      ...current,
      lists: current.lists.map((list) => {
        if (list.id !== listId) return list;

        return {
          ...list,
          items: list.items.filter((item) => String(item.id) !== String(itemId)),
        };
      }),
    }));

  const toggleFollow = (name) =>
    setData((current) => {
      const found = current.following.find((person) => person === name);

      if (found) {
        return {
          ...current,
          following: current.following.filter((person) => person !== name),
        };
      }

      return {
        ...current,
        following: [...current.following, name],
      };
    });

  const toggleSpoiler = () =>
    setData((current) => ({
      ...current,
      spoilerSafe: !current.spoilerSafe,
    }));

  const stats = useMemo(() => {
    const reviews = data.reviews;

    return {
      watched: watched.length,
      series: watched.filter(
        (item) => item.media_type === "tv" || (!item.title && item.name)
      ).length,
      avg: reviews.length
        ? (
            reviews.reduce((total, item) => total + item.rating, 0) /
            reviews.length
          ).toFixed(1)
        : "—",
      reviews: reviews.length,
      lists: data.lists.length,
    };
  }, [watched, data]);

  const value = {
    data,
    watched,
    stats,
    toggleWatched,
    addWatchlist,
    removeWatchlist,
    review,
    removeReview,
    addComment,
    removeComment,
    addList,
    addToList,
    removeFromList,
    toggleFollow,
    toggleSpoiler,
  };

  return createElement(AppDataContext.Provider, { value }, children);
};

const useAppData = () => {
  const context = useContext(AppDataContext);

  if (!context) {
    throw new Error("useAppData deve ser usado dentro de AppDataProvider.");
  }

  return context;
};

export { AppDataProvider, useAppData };
