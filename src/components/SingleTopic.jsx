import { useEffect, useState } from "react";
import api from "../api/api";
import TopicCard from "./TopicCard";


export default function SingleTopic({topicChoice}) {
console.log(topicChoice)
  const [topicArticles, setTopicArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    api
      .get(`/articles?topic=${topicChoice}`)
      .then(({ data: { articles } }) => {
        console.log(articles)
        setIsLoading(false);
        setTopicArticles(articles);
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

  if (isLoading) return <p>Just a moment...</p>;
  if (error)
    return (
      <p>
        Error {error.status} {error.message}
      </p>
    );

return (
  <section className="topic-display">
  {topicArticles.map((topicArticle) => {
    return (
      <TopicCard
        // key={top}
        topicArticle={topicArticle}
      />
    );
  })}
</section>
)

}