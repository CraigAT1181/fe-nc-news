import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import Comments from "./Comments";
import Votes from "./Votes";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [vote, setVote] = useState(0);

  /* -------------------FUNCTIONS---------------------- */

  const handleCommentClick = () => {
    showComments === true ? setShowComments(false) : setShowComments(true);
  };

  /* ------------------REQUESTING ARTICLE BY ID------------------ */

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    api
      .get(`/articles/${article_id}`)
      .then(({ data: { article } }) => {
        setIsLoading(false);
        setVote(article.votes);
        setArticle(article);
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

  /* --------------HANDLING LOADING & ERROR---------------- */

  if (isLoading) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        Error {error.status} {error.message}
      </p>
    );

  /* -----------------RENDERING PAGE-------------------- */

  return (
    <>
      <section className="single-article">
        <h1>{article.title}</h1>
        <p>Written by {article.author}</p>
        <p>{article.created_at}</p>
        <img
          className="single-article-image"
          src={article.article_img_url}
          alt={`A cover picture reflecting the topic of ${article.topic}`}
        />
        <p>{article.body}</p>
        <Votes
          articleVotes={article.votes}
          vote={vote}
          setVote={setVote}
        />
        <p
          id="comment-link"
          onClick={handleCommentClick}>
          Comments
        </p>

        {showComments ? (
          <>
            <Comments />
          </>
        ) : null}
      </section>
    </>
  );
}
