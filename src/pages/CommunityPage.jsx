import { FiHeart, FiMessageCircle, FiUserPlus } from "react-icons/fi";
import { useAppData } from "../components/useAppData.js";
import "./CommunityPage.css";

const feed = [
  [
    "marina.cine",
    "assistiu",
    "Interestelar",
    "Ainda tentando entender como um filme consegue continuar na cabeça tantos dias depois.",
  ],
  [
    "rafaelseries",
    "terminou",
    "The Last of Us",
    "Aquele tipo de episódio que você termina e fica em silêncio por alguns minutos.",
  ],
  [
    "luanfilmes",
    "recomendou",
    "Duna: Parte Dois",
    "Visual absurdo e uma trilha que parece empurrar cada cena.",
  ],
];

const people = ["marina.cine", "rafaelseries", "luanfilmes", "bia.watch"];

const CommunityPage = () => {
  const { data, toggleFollow } = useAppData();

  return (
    <div className="container">
      <div className="section-head">
        <div>
          <h1>Comunidade</h1>
          <p>Descubra pessoas que assistem às mesmas histórias que você.</p>
        </div>
      </div>

      <div className="community-grid">
        <section>
          <h2>Atividade</h2>
          {feed.map((item, index) => (
            <article className="feed-card" key={index}>
              <div className="avatar">{item[0][0].toUpperCase()}</div>
              <div>
                <p>
                  <b>{item[0]}</b> {item[1]} <strong>{item[2]}</strong>
                </p>
                <p className="feed-text">{item[3]}</p>
                <div className="feed-actions">
                  <span>
                    <FiHeart /> 12
                  </span>
                  <span>
                    <FiMessageCircle /> 4
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>

        <aside>
          <h2>Pessoas para seguir</h2>
          {people.map((name) => (
            <div className="person" key={name}>
              <div className="avatar">{name[0].toUpperCase()}</div>
              <div>
                <b>{name}</b>
                <small>Filmes, séries e boas conversas</small>
              </div>
              <button className="btn" onClick={() => toggleFollow(name)}>
                <FiUserPlus />
                {data.following.includes(name) ? "Seguindo" : "Seguir"}
              </button>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
};

export default CommunityPage;
