import { useEffect, useState } from "react";
import api from "../api/api";
import ArticleCard from "./ArticleCard";
import { useSearchParams } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [sortby, setSortby] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
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
  }, [searchParams]);

  // function handleSortby(e) {
  //   setSortby(e.target.value)
  // }

  if (isLoading) return <p>Just a moment...</p>;
  if (error)
    return (
      <p>
        Error {error.status} {error.message}
      </p>
    );

  return (
    <>
  
      
        {/* <form onSubmit={handleSortby}>
      <label htmlFor="sortby">Sort By</label>
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
              Choose...
            </option>
         <option value="date">Date</option>
         <option value="comment_count">Comments</option>
         <option value="vote">Votes</option>
          </select>
        </form> */}

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
