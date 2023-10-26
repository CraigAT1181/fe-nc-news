import { useEffect, useState } from "react";
import api from "../api/api";
import ArticleCard from "./ArticleCard";
import { useSearchParams } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [topicTitle, setTopicTitle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams();
  const [sortby, setSortby] = useState();
  // const [order, setOrder] = useState(searchParams.get("order") || "desc")

  useEffect(() => {
    // setSearchParams({sortby: sortby, order: order})
    setIsLoading(true);
    setError(null);
    api
      .get(`/articles?${searchParams.toString()}`)
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
  }, [searchParams, sortby]);

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

  function handleTopics(e) {
    e.preventDefault();
    setIsLoading(true);

    setSearchParams(`topic=${e.target.value}`);
    setTopicTitle(`${e.target.value.charAt(0).toUpperCase()}${e.target.value.slice(
      1
    )}`);
  }

  function handleSortby(e) {
    setSortby(e.target.value);
    // searchParams.get("sortby")
    // console.log(e.target.value);
    // console.log(searchParams.get(sortby));
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
      <section className="filter-display">
        <form onChange={handleTopics}>
          <select
            type="text"
            id="topic-choice"
            defaultValue="choose"
            required>
            <option
              key="placeholder"
              value="choose"
              disabled
              hidden>
              Filter Topic
            </option>
            {topics.sort().map((topic) => {
              return (
                <option
                  key={topic.slug}
                  value={topic.slug}>
                  {`${topic.slug.charAt(0).toUpperCase()}${topic.slug.slice(
                    1
                  )}`}
                </option>
              );
            })}
          </select>
        </form>

        <form onChange={handleSortby}>
          <label htmlFor="sortby"></label>
          <select
            onChange={handleSortby}
            type="text"
            id="sortby"
            defaultValue="choose"
            required>
            <option
              key="placeholder"
              value="choose"
              disabled
              hidden>
              Sort By
            </option>
            <option value="created_at">Date</option>
            <option value="comment_count">Comments</option>
            <option value="votes">Votes</option>
          </select>
        </form>
      </section>

      <section>
        <h1 id="topic-title">{topicTitle}</h1>
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
    </>
  );
}
