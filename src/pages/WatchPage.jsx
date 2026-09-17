import { FiCheck, FiClock, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAppData } from "../components/useAppData.js";
import { IMAGE_BASE } from "../components/tmdb.js";
import "./WatchPage.css";

const WatchPage = () => {
  const { watched, data, removeWatchlist } = useAppData();

  return (
    <div className="container">
      <h1>Minha biblioteca</h1>
      <p>Seu histórico, sua lista e o que está por vir.</p>

      <section className="library">
        <div>
          <h2>
            <FiCheck /> Assistidos
          </h2>
          {watched.length ? (
            <div className="library-grid">
              {watched.map((item) => (
                <Media key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <Empty text="Você ainda não marcou nenhum título como assistido." />
          )}
        </div>

        <div>
          <h2>
            <FiClock /> Quero assistir
          </h2>
          {data.watchlist.length ? (
            <div className="library-grid">
              {data.watchlist.map((item) => (
                <Media
                  key={item.id}
                  item={item}
                  remove={() => removeWatchlist(item.id)}
                />
              ))}
            </div>
          ) : (
            <Empty text="Sua lista está vazia." />
          )}
        </div>
      </section>
    </div>
  );
};

const Media = ({ item, remove }) => (
  <article className="library-item">
    {item.poster_path && (
      <img src={`${IMAGE_BASE}${item.poster_path}`} alt="" />
    )}
    <div>
      <b>{item.name || item.title}</b>
      <Link to={`/serie/${item.id}`}>Ver detalhes</Link>
      {remove && (
        <button className="btn btn-ghost" onClick={remove}>
          <FiTrash2 /> Remover
        </button>
      )}
    </div>
  </article>
);

const Empty = ({ text }) => <p className="empty-lib">{text}</p>;

export default WatchPage;
