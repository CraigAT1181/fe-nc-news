import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleByID } from "../api/api";
import Comments from "./Comments";
import Votes from "./Votes";
import { Link } from "react-router-dom";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState(false);

  /* Get Article */

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getArticleByID(article_id)
      .then(({ article }) => {
        setIsLoading(false);
        setArticle(article);
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

  /* Utility Functions */

  const handleCommentClick = () => {
    showComments === true ? setShowComments(false) : setShowComments(true);
  };

  /* Load & Error-handling */

  if (isLoading) return <p>Loading...</p>;
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
          article_id={article.article_id}
          articleVotes={article.votes}
        />
        <div id="comment-link-div">
          <p
            id="comment-link"
            onClick={handleCommentClick}>
            Comments
          </p>
        </div>

        {showComments ? <Comments /> : null}
      </section>
    </>
  );
}
