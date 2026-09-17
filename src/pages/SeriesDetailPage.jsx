import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FiBookmark,
  FiChevronRight,
  FiStar,
  FiCheck,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { getSeriesDetails, BACKDROP_BASE, IMAGE_BASE } from "../components/tmdb.js";
import { useTrackedShows } from "../components/useTrackedShows.js";
import { useAppData } from "../components/useAppData.js";
import Loader from "../components/Loader.jsx";
import EmptyState from "../components/EmptyState.jsx";
import Comments from "../components/Comments.jsx";
import "./SeriesDetailPage.css";

const SeriesDetailPage = () => {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [status, setStatus] = useState("loading");

  const { isTracked, trackShow, untrackShow } = useTrackedShows();
  const {
    data,
    toggleWatched,
    addWatchlist,
    removeWatchlist,
    review,
    removeReview,
    addToList,
  } = useAppData();
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [selectedListId, setSelectedListId] = useState("");
  const [reviewSaved, setReviewSaved] = useState(false);
  const [listMessage, setListMessage] = useState("");

  useEffect(() => {
    let active = true;
    setStatus("loading");

    getSeriesDetails(id)
      .then((data) => {
        if (!active) return;
        setSeries(data);
        setStatus("success");
      })
      .catch((error) => {
        console.error(error);
        if (active) setStatus("error");
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (status === "loading") {
    return (
      <div className="container">
        <Loader label="Carregando série..." />
      </div>
    );
  }

  if (status === "error" || !series) {
    return (
      <div className="container">
        <EmptyState
          title="Não foi possível carregar esta série"
          description="Tente voltar e escolher outra série."
        />
      </div>
    );
  }

  const tracking = isTracked(series.id);
  const seasons = (series.seasons || []).filter(
    (season) => season.season_number !== 0 && season.episode_count > 0
  );
  const opinions = data.reviews.filter(
    (item) => String(item.itemId) === String(series.id)
  );
  const listId = selectedListId || data.lists[0]?.id || "";
  const isInWatchlist = data.watchlist.some(
    (item) => String(item.id) === String(series.id)
  );

  return (
    <div>
      {series.backdrop_path && (
        <div
          className="series-hero"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(18,20,28,0.2), var(--ink) 92%), url(${BACKDROP_BASE}${series.backdrop_path})`,
          }}
        />
      )}

      <div className="container series-detail">
        <div className="series-detail__poster">
          {series.poster_path && (
            <img src={`${IMAGE_BASE}${series.poster_path}`} alt={series.name} />
          )}
        </div>

        <div className="series-detail__info">
          <h1>{series.name}</h1>

          <div className="series-detail__meta">
            {series.first_air_date && (
              <span>{series.first_air_date.slice(0, 4)}</span>
            )}
            <span>{seasons.length} temporada(s)</span>
            {series.vote_average > 0 && (
              <span className="series-detail__rating">
                <FiStar aria-hidden="true" /> {series.vote_average.toFixed(1)}
              </span>
            )}
          </div>

          <p className="series-detail__overview">
            {series.overview || "Sem sinopse disponível."}
          </p>

          <button
            type="button"
            className={
              tracking ? "btn btn-primary" : "btn"
            }
            onClick={() =>
              tracking ? untrackShow(series.id) : trackShow(series)
            }
          >
            <FiBookmark aria-hidden="true" />
            {tracking ? "Acompanhando" : "Acompanhar série"}
          </button>

          <div className="detail-actions">
            <button
              className={
                data.watched.find((item) => item.id === series.id)
                  ? "btn btn-primary"
                  : "btn"
              }
              onClick={() => toggleWatched(series)}
            >
              <FiCheck />
              {data.watched.find((item) => item.id === series.id)
                ? "Assistido"
                : "Marcar assistido"}
            </button>
            <button
              className={isInWatchlist ? "btn btn-primary" : "btn"}
              onClick={() =>
                isInWatchlist ? removeWatchlist(series.id) : addWatchlist(series)
              }
            >
              <FiPlus />
              {isInWatchlist ? "Na lista - remover" : "Quero assistir"}
            </button>
          </div>

          <div className="add-to-list">
            <label htmlFor="target-list">Adicionar à lista</label>
            <select
              id="target-list"
              value={listId}
              onChange={(event) => setSelectedListId(event.target.value)}
              disabled={data.lists.length === 0}
            >
              {data.lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </select>
            <button
              className="btn"
              disabled={!listId}
              onClick={() => {
                addToList(listId, series);
                setListMessage("Título adicionado à lista.");
              }}
            >
              <FiPlus /> Adicionar
            </button>
            {listMessage && <small>{listMessage}</small>}
          </div>

          <div className="where-watch">
            <h2>Onde assistir</h2>
            <div className="provider-row">
              <span>Netflix</span>
              <span>Prime Video</span>
              <span>Disney+</span>
              <span>Max</span>
            </div>
            <small>Disponibilidade pode variar por região e plano.</small>
          </div>

          <section className="review-box">
            <h2>
              <FiStar />
              Sua opinião
            </h2>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  className={n <= reviewRating ? "star-on" : ""}
                  onClick={() => setReviewRating(n)}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="O que você achou? Escreva sem spoilers..."
            />
            <button
              className="btn btn-primary"
              onClick={() => {
                const text = reviewText.trim();

                if (text) {
                  review(series, reviewRating, text);
                  setReviewText("");
                  setReviewSaved(true);
                }
              }}
            >
              Publicar opinião
            </button>
            {reviewSaved && (
              <p className="form-feedback" role="status">
                Opinião publicada. Ela aparece logo abaixo e no seu perfil.
              </p>
            )}

            <div className="reviews-list">
              <h3>Suas opiniões sobre esta série</h3>
              {opinions.length === 0 ? (
                <p>Você ainda não publicou uma opinião sobre esta série.</p>
              ) : (
                opinions.map((item) => (
                  <article className="review-item" key={item.id}>
                    <div className="review-item__head">
                      <span aria-label={`Nota ${item.rating} de 5`}>
                        {"★".repeat(item.rating)}
                        {"☆".repeat(5 - item.rating)}
                      </span>
                      <button
                        type="button"
                        className="review-delete"
                        onClick={() => removeReview(item.id)}
                        aria-label="Apagar opinião"
                      >
                        <FiTrash2 /> Apagar
                      </button>
                    </div>
                    <p>{item.text}</p>
                  </article>
                ))
              )}
            </div>
          </section>

          <Comments seriesId={series.id} />

          <h2 className="series-detail__seasons-title">Temporadas</h2>
          <ul className="season-list">
            {seasons.map((season) => (
              <li key={season.id}>
                <Link
                  to={`/serie/${series.id}/temporada/${season.season_number}`}
                  className="season-list__item"
                >
                  <span>
                    {season.name} · {season.episode_count} episódios
                  </span>
                  <FiChevronRight aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SeriesDetailPage;
