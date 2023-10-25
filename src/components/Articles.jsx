import { useEffect, useState } from "react";
import api from "../api/api";
import ArticleCard from "./ArticleCard";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState();
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

  function handleSearch(e) {
    e.preventDefault();
  }

  if (isLoading) return <p>Just a moment...</p>;
  if (error)
    return (
      <p>
        Error {error.status} {error.message}
      </p>
    );

  return (
    <>
    <main className="articles">
      <section className="search">
        <form onSubmit={handleSearch}>
          <label htmlFor="search-bar">Article Search</label>
          <input
            id="search-bar"
            type="text"
            placeholder="Enter Article ID or Name"
          />
          <button>Search</button>
        </form>
      </section>
      <section className="article-display">
        {articles.map((article) => {
          return (
            <ArticleCard
              key={article.article_id}
              article={article}
            />
          );
        })}
      </section>
      </main>
    </>
  );
}
