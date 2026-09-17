import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCompass, FiTrendingUp } from "react-icons/fi";
import { getTrendingSeries } from "../components/tmdb.js";
import SeriesGrid from "../components/SeriesGrid.jsx";
import Loader from "../components/Loader.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useAppData } from "../components/useAppData.js";
import "./HomePage.css";

const HomePage = () => {
  const [series, setSeries] = useState([]);
  const [status, setStatus] = useState("loading");
  const { watched } = useAppData();

  useEffect(() => {
    getTrendingSeries()
      .then((data) => {
        setSeries(data.results || []);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="container home">
      <section className="hero">
        <div>
          <span className="eyebrow">
            <FiCompass /> seu próximo episódio começa aqui
          </span>
          <h1>
            Descubra. <span>Assista.</span>
            <br />
            Compartilhe.
          </h1>
          <p className="hero__subtitle">
            Um lugar para descobrir o que assistir, guardar o que já viu,
            acompanhar séries, registrar opiniões e encontrar pessoas com o
            mesmo gosto.
          </p>
          <div className="hero-ctas">
            <Link className="btn btn-primary" to="/busca?q=The">
              Explorar catálogo <FiArrowRight />
            </Link>
            <Link className="btn btn-ghost" to="/perfil">
              Ver minhas estatísticas
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <b>{watched.length}</b>
          <span>conteúdos no seu histórico</span>
          <small>Continue organizando seu diário.</small>
        </div>
      </section>

      <section>
        <div className="section-head">
          <h2>
            <FiTrendingUp /> Em alta
          </h2>
          <Link className="link-quiet" to="/busca?q=">
            ver catálogo →
          </Link>
        </div>

        {status === "loading" && <Loader label="Buscando títulos em alta..." />}

        {status === "error" && (
          <EmptyState
            title="Não foi possível carregar o catálogo"
            description="Confira a chave do TMDB no .env."
          />
        )}

        {status === "success" && <SeriesGrid series={series} />}
      </section>

      <section className="feature-row">
        <div>
          <b>🎯 Recomendações</b>
          <span>
            Use seu histórico para construir um catálogo cada vez mais pessoal.
          </span>
        </div>
        <div>
          <b>🛡️ Sem spoilers</b>
          <span>Discussões e comentários ficam protegidos por episódio.</span>
        </div>
        <div>
          <b>📊 Seu histórico</b>
          <span>Acompanhe suas avaliações, listas e hábitos de assistir.</span>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
