import "./style.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-title">
        Copyright © {new Date().getFullYear()} -{" "}
        <a
          href="https://jonathansaan.github.io/portfolio/"
          target="_blank"
          rel="noreferrer"
          className="footer-titleName"
        >
          Jonathan Saan.
        </a>
      </p>
    </footer>
  );
};

export default Footer;
