import { useEffect, useState } from "react";
import { getArticles, getTopics } from "../api/api";
import ArticleCard from "./ArticleCard";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [topicTitle, setTopicTitle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams();
  const [sortby, setSortby] = useState("created_at");
  const [order, setOrder] = useState("desc");

  /* Get Articles */

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getArticles(searchParams.toString())
      .then(({ articles }) => {
        setIsLoading(false);
        if (sortby === "votes") {
          articles.sort((a, b) => {
            if (a.votes < b.votes && order === "asc") {
              return -1;
            } else if (a.votes < b.votes && order === "desc") {
              return 1;
            }
            if (a.votes > b.votes && order === "asc") {
              return 1;
            } else if (a.votes > b.votes && order === "desc") {
              return -1;
            }
            return 0;
          });
        }

        if (sortby === "comment_count") {
          articles.sort((a, b) => {
            if (a.comment_count < b.comment_count && order === "asc") {
              return -1;
            } else if (a.comment_count < b.comment_count && order === "desc") {
              return 1;
            }
            if (a.comment_count > b.comment_count && order === "asc") {
              return 1;
            } else if (a.comment_count > b.comment_count && order === "desc") {
              return -1;
            }
            return 0;
          });
        }

        if (sortby === "created_at") {
          articles.sort((a, b) => {
            if (a.created_at < b.created_at && order === "asc") {
              return -1;
            } else if (a.created_at < b.created_at && order === "desc") {
              return 1;
            }
            if (a.created_at > b.created_at && order === "asc") {
              return 1;
            } else if (a.created_at > b.created_at && order === "desc") {
              return -1;
            }
            return 0;
          });
        }
        setArticles(articles);
        setOrder(order);
        setSortby(sortby);
      })
      .catch(
        ({
          response: {
            status,
            data: { message },
          },
        }) => {
          setIsLoading(false);
          setError({ status, message: message });
        }
      );
  }, [searchParams, sortby, order]);

  /* Get Topics */

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getTopics()
      .then(({ topics }) => {
        setIsLoading(false);
        setTopics(topics);
      })
      .catch(
        ({
          response: {
            status,
            data: { message },
          },
        }) => {
          setIsLoading(false);
          setError({ status, message: message });
        }
      );
  }, []);

  /* Load & Error-handling */

  if (isLoading) return <p>Just a moment...</p>;
  if (error)
    return (
      <section className="error-handling">
        <p id="error-message">
          Oops! We've not found what you were looking for...
        </p>
        <Link to={`/articles`}>
          <button id="error-button">Return to Articles</button>
        </Link>
      </section>
    );

  /* Rendering */

  return (
    <>
      <section className="filter-display">
        <form
          onChange={(e) => {
            e.preventDefault();
            setIsLoading(true);
            setSearchParams(`topic=${e.target.value}`);
            setTopicTitle(
              `${e.target.value.charAt(0).toUpperCase()}${e.target.value.slice(
                1
              )}`
            );
          }}>
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

        <form
          onChange={(e) => {
            setSortby(e.target.value);
          }}>
          <label htmlFor="sortby"></label>
          <select
            type="text"
            id="sortby"
            defaultValue="choose"
            required>
            <option
              key="placeholder"
              value="choose"
              disabled
              hidden>
              {sortby}
            </option>
            <option value="created_at">Date</option>
            <option value="comment_count">Comments</option>
            <option value="votes">Votes</option>
          </select>
        </form>

        <form
          onChange={(e) => {
            setOrder(e.target.value);
          }}>
          <label htmlFor="order"></label>
          <select
            type="text"
            id="order"
            defaultValue="choose"
            required>
            <option
              key="placeholder"
              value="choose"
              disabled
              hidden>
              {order}
            </option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </form>
      </section>

      {searchParams.get("topic") ? (
        <section>
          <h3 id="topic-title">{topicTitle}</h3>
        </section>
      ) : null}

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
