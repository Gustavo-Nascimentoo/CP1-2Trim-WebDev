import { Link } from "react-router-dom";
import { FiStar } from "react-icons/fi";
import { IMAGE_BASE } from "../components/tmdb.js";
import "./SeriesCard.css";

const SeriesCard = ({ series }) => {
  const poster = series.poster_path
    ? `${IMAGE_BASE}${series.poster_path}`
    : null;

  return (
    <Link to={`/serie/${series.id}`} className="series-card">
      <div className="series-card__poster">
        {poster ? (
          <img src={poster} alt={`Pôster de ${series.name}`} loading="lazy" />
        ) : (
          <div className="series-card__placeholder">{series.name}</div>
        )}
        {typeof series.vote_average === "number" && series.vote_average > 0 && (
          <span className="series-card__rating">
            <FiStar aria-hidden="true" />
            {series.vote_average.toFixed(1)}
          </span>
        )}
      </div>
      <p className="series-card__title">{series.name}</p>
    </Link>
  );
};

export default SeriesCard;
