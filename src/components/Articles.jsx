import { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    api
      .get("/articles")
      .then(({ data: { articles } }) => {
        setIsLoading(false);
        setArticles(articles);
      })
      .catch(
        ({
          response: {
            data: { msg },
            status,
          },
        }) => {
          setIsLoading(false);
          setError({ status, message: msg });
        }
      );
  }, []);

  const linkStyle = {
    textDecoration: "none",
    color: 'black'
  };

  if (isLoading) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        Error {error.status} {error.message}
      </p>
    );

  return (
    <section className="article-display">
      {articles.map((article) => {
        return (
          <article
            className="article"
            key={article.article_id}>
            <h2>
              <Link style={linkStyle} to={`/articles/${article.article_id}`}>
                {article.title}
              </Link>
            </h2>
            <p>Written by: {article.author}</p>
            <p>About: {article.topic}</p>
            <p>{article.created_at}</p>
            <p>Comments: {article.comment_count}</p>
            <p>Votes: {article.votes}</p>
            <Link to={`/articles/${article.article_id}`}>
            <img
              className="article-image"
              src={article.article_img_url}
              alt={`A cover picture reflecting the topic of ${article.topic}`}
            />
            </Link>
          </article>
        );
      })}
    </section>
  );
}
