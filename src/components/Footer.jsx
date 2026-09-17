import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          📧 <strong>E-mail:</strong>{' '}
          <a href="mailto:contact@cineverse.com">contact@cineverse.com</a>
        </p>

        <p>
          Dados de séries fornecidos por{' '}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noreferrer"
          >
            TMDB
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
