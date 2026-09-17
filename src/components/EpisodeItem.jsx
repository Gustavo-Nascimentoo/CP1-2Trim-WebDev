import { FiCheckCircle, FiCircle } from "react-icons/fi";
import "./EpisodeItem.css";

const EpisodeItem = ({ episode, watched, onToggle }) => {
  return (
    <li className={watched ? "episode-item episode-item--watched" : "episode-item"}>
      <button
        type="button"
        className="episode-item__toggle"
        onClick={onToggle}
        aria-pressed={watched}
        aria-label={
          watched
            ? `Marcar episódio ${episode.episode_number} como não assistido`
            : `Marcar episódio ${episode.episode_number} como assistido`
        }
      >
        {watched ? <FiCheckCircle /> : <FiCircle />}
      </button>

      <div className="episode-item__info">
        <span className="episode-item__number">
          E{episode.episode_number < 10 ? `0${episode.episode_number}` : episode.episode_number}
        </span>
        <span className="episode-item__name">{episode.name}</span>
      </div>

      {episode.air_date && (
        <span className="episode-item__date">{episode.air_date}</span>
      )}
    </li>
  );
};

export default EpisodeItem;
