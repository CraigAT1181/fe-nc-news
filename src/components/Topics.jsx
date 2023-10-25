import { useEffect, useState } from "react";
import api from "../api/api";
import ArticleCard from "./ArticleCard";

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [articlesByTopic, setArticlesByTopic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    api
      .get("/topics")
      .then(({ data: { topics } }) => {
        setIsLoading(false);
        setTopics(topics);
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

  function searchArticles(e) {
    e.preventDefault();
    setIsLoading(true);
    api
      .get(`/articles?topic=${e.target[0].value}`)
      .then(({ data: { articles } }) => {
        setIsLoading(false);
        setArticlesByTopic(articles);
      })      .catch(
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
      <form onSubmit={searchArticles}>
        <select
          type="text"
          id="topicChoice"
          defaultValue="choose"
          required>
          <option
            key="placeholder"
            value="choose"
            disabled
            hidden>
            Choose a Topic
          </option>
          {topics.sort().map((topic) => {
            return (
              <option
                key={topic.slug}
                value={topic.slug}>
                {topic.slug}
              </option>
            );
          })}
        </select>
        <button>Search</button>
      </form>

      <section className="article-display">
        {articlesByTopic.map((article) => {
          return (
            <ArticleCard
              key={article.article_id}
              article={article}
            />
          );
        })}
      </section>
    </>
  );
}
