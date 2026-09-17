import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiTv,
  FiUser,
  FiUsers,
  FiList,
  FiPlayCircle,
} from "react-icons/fi";
import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();

    if (query !== "") {
      navigate(`/busca?q=${query}`);
    }
  };

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand">
          <FiTv />
          <span>
            Cine<strong>Verse</strong>
          </span>
        </Link>

        <form className="navbar__search" onSubmit={submit}>
          <FiSearch />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filmes, séries, pessoas..."
          />
        </form>

        <nav className="navbar__links">
          <NavLink to="/" end>
            Descobrir
          </NavLink>
          <NavLink to="/biblioteca">
            <FiPlayCircle /> Biblioteca
          </NavLink>
          <NavLink to="/listas">
            <FiList /> Listas
          </NavLink>
          <NavLink to="/comunidade">
            <FiUsers /> Comunidade
          </NavLink>
          <NavLink to="/perfil">
            <FiUser /> Perfil
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
