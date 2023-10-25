import { useEffect, useState } from "react";
import api from "../api/api";
import TopicCard from "./TopicCard";

export default function Topics() {
  const [topics, setTopics] = useState([]);
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

  if (isLoading) return <p>Just a moment...</p>;
  if (error)
    return (
      <p>
        Error {error.status} {error.message}
      </p>
    );

  return (
    <>
      <section className="topic-display">
        {topics.map((topic) => {
          return (
            <TopicCard
              key={topic.slug}
              topic={topic}
            />
          );
        })}
      </section>
    </>
  );
}
