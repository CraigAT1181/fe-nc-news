import CommentsCard from "./CommentsCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function Comments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState(null);
  const [commentDeleted, setCommentDeleted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    api
      .get(`/articles/${article_id}/comments`)
      .then(({ data: { comments } }) => {
        setIsLoading(false);
        setComments(comments);
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

    setCommentDeleted(false);
  }, [newComment, commentDeleted]);

  function postComment(e) {
    e.preventDefault();
    setIsLoading(true);

    api
      .post(`/articles/${article_id}/comments`, {
        username: "jessjelly",
        body: e.target[0].value,
      })
      .then(({ data: { comment } }) => {
        setIsLoading(false);
        setNewComment(comment);
      })
      .catch(
        ({
          response: {
            type: { msg },
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
      <section className="comments-display">
        <form
          onSubmit={postComment}
          id="comment-box">
          <label htmlFor="comment-input"></label>
          <input
            id="comment-input"
            type="text"
            required
          />
          <button id="post-comment-button">post</button>
        </form>

        {comments.length === 0
          ? "No one has posted a comment on this article yet!"
          : null}

        {newComment ? "Post successful!" : null}

        {comments.map((comment) => {
          return (
            <CommentsCard
              key={comment.comment_id}
              comment={comment}
              setCommentDeleted={setCommentDeleted}
            />
          );
        })}
      </section>
    </>
  );
}
