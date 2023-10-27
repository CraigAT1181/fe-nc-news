import { Link } from "react-router-dom";

export default function ErrorHandling() {
  return (
    <section className="error-handling">
      <p id="error-message">Oops! We've lost our way...</p>
      <Link to={`/articles`}>
        <button id="error-button">Return to Articles</button>
      </Link>
    </section>
  );
}
