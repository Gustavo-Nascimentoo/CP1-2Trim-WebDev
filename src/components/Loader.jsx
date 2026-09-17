import "./Loader.css";

const Loader = ({ label = "Carregando..." }) => {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__dot" />
      <span>{label}</span>
    </div>
  );
};

export default Loader;
