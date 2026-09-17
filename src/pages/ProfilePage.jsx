import { FiBarChart2, FiEye, FiFilm, FiList, FiStar } from "react-icons/fi";
import { useAppData } from "../components/useAppData.js";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { stats, data, toggleSpoiler } = useAppData();

  return (
    <div className="container profile">
      <div className="profile-head">
        <div className="big-avatar">C</div>
        <div>
          <h1>Meu perfil</h1>
          <p>Seu diário de filmes e séries.</p>
        </div>
      </div>

      <div className="stats-grid">
        <Stat icon={<FiFilm />} number={stats.watched} text="Conteúdos assistidos" />
        <Stat icon={<FiEye />} number={stats.series} text="Séries assistidas" />
        <Stat icon={<FiStar />} number={stats.avg} text="Nota média" />
        <Stat icon={<FiList />} number={stats.lists} text="Listas" />
        <Stat icon={<FiBarChart2 />} number={stats.reviews} text="Opiniões" />
      </div>

      <section className="profile-panel">
        <h2>Privacidade</h2>
        <label className="toggle">
          <input
            type="checkbox"
            checked={data.spoilerSafe}
            onChange={toggleSpoiler}
          />
          <span /> Ocultar spoilers por padrão
        </label>
      </section>
    </div>
  );
};

const Stat = ({ icon, number, text }) => (
  <div className="stat">
    <span>{icon}</span>
    <b>{number}</b>
    <small>{text}</small>
  </div>
);

export default ProfilePage;
