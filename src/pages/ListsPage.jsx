import { FiPlus, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { useAppData } from "../components/useAppData.js";
import { IMAGE_BASE } from "../components/tmdb.js";
import "./ListsPage.css";

const ListsPage = () => {
  const { data, addList, removeFromList } = useAppData();
  const [name, setName] = useState("");

  const submit = () => {
    if (name === "") return;

    addList(name);
    setName("");
  };

  return (
    <div className="container">
      <h1>Minhas listas</h1>
      <p>Organize filmes e séries do seu jeito.</p>

      <div className="new-list">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Nome da nova lista"
        />
        <button className="btn btn-primary" onClick={submit}>
          <FiPlus /> Criar lista
        </button>
      </div>

      <div className="lists-grid">
        {data.lists.map((list) => (
          <section className="list-card" key={list.id}>
            <div className="list-title">
              <h2>{list.name}</h2>
              <span>{list.items.length} itens</span>
            </div>

            {list.items.length ? (
              <>
                <div className="mini-posters">
                  {list.items.slice(0, 6).map(
                    (item) =>
                      item.poster_path && (
                        <img
                          key={item.id}
                          src={`${IMAGE_BASE}${item.poster_path}`}
                          alt={`Pôster de ${item.name || item.title}`}
                        />
                      )
                  )}
                </div>
                <ul className="list-items">
                  {list.items.map((item) => (
                    <li key={item.id}>
                      <span>{item.name || item.title}</span>
                      <button
                        type="button"
                        className="btn btn-ghost btn-danger"
                        onClick={() => removeFromList(list.id, item.id)}
                      >
                        <FiTrash2 /> Remover
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>Adicione títulos a esta lista pela página de detalhes.</p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default ListsPage;
