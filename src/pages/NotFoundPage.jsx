import { Link } from "react-router-dom";
import { FiCompass } from "react-icons/fi";
import EmptyState from "../components/EmptyState.jsx";

const NotFoundPage = () => {
  return (
    <div className="container">
      <EmptyState
        icon={<FiCompass />}
        title="Página não encontrada"
        description="O episódio que você procura não está no ar."
        action={
          <Link to="/" className="btn btn-primary">
            Voltar para o início
          </Link>
        }
      />
    </div>
  );
};

export default NotFoundPage;
