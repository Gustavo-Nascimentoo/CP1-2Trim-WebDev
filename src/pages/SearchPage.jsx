import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { searchSeries } from "../components/tmdb.js";
import SeriesGrid from "../components/SeriesGrid.jsx";
import Loader from "../components/Loader.jsx";
import EmptyState from "../components/EmptyState.jsx";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!query) {
      setResults([]);
      setStatus("idle");
      return;
    }

    let active = true;
    setStatus("loading");

    searchSeries(query)
      .then((data) => {
        if (!active) return;
        setResults(data.results || []);
        setStatus("success");
      })
      .catch((error) => {
        console.error(error);
        if (active) setStatus("error");
      });

    return () => {
      active = false;
    };
  }, [query]);

  return (
    <div className="container">
      <div className="section-head">
        <h2>{query ? `Resultados para "${query}"` : "Buscar séries"}</h2>
      </div>

      {status === "idle" && (
        <EmptyState
          icon={<FiSearch />}
          title="Digite o nome de uma série"
          description="Use a busca no topo da página para encontrar uma série pelo nome."
        />
      )}

      {status === "loading" && <Loader label="Buscando..." />}

      {status === "error" && (
        <EmptyState
          title="Não foi possível buscar agora"
          description="Verifique sua conexão ou a chave da API do TMDB."
        />
      )}

      {status === "success" && results.length === 0 && (
        <EmptyState
          title="Nenhuma série encontrada"
          description={`Não encontramos resultados para "${query}". Tente outro termo.`}
        />
      )}

      {status === "success" && results.length > 0 && (
        <SeriesGrid series={results} />
      )}
    </div>
  );
};

export default SearchPage;
