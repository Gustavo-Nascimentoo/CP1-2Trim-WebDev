import { FiCheck, FiPlus } from "react-icons/fi";
import { useAppData } from "./useAppData.js";

const MediaActions = ({ item }) => {
  const { watched, data, toggleWatched, addWatchlist } = useAppData();
  const isWatched = !!watched.find((media) => media.id === item.id);
  const isListed = !!data.watchlist.find((media) => media.id === item.id);

  return (
    <div className="media-actions">
      <button
        className={`btn ${isWatched ? "btn-primary" : ""}`}
        onClick={() => toggleWatched(item)}
      >
        <FiCheck />
        {isWatched ? "Assistido" : "Marcar assistido"}
      </button>

      <button
        className="btn"
        disabled={isListed}
        onClick={() => addWatchlist(item)}
      >
        <FiPlus />
        {isListed ? "Na lista" : "Quero assistir"}
      </button>
    </div>
  );
};

export default MediaActions;
