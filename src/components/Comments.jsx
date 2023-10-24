import CommentsCard from "./CommentsCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function Comments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState(null)

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
  }, []);

  function postComment (e) {
e.preventDefault()
setIsLoading(true)
api.post(`/articles/${article_id}/comments`, {
    username: "butter_bridge",
    body: "Great article!",
}).then((response) => {
    console.log(response)
})
  }

  if (isLoading) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        Error {error.status} {error.message}
      </p>
    );

  return (
    <section className="comments-display">

      {comments.map((comment) => {
        return (
          <CommentsCard
            key={comment.comment_id}
            comment={comment}
          />
        );
      })}
    </section>
  );
}
