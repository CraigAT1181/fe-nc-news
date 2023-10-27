import api from "../api/api";

export default function CommentCard({
  comment,
  setCommentDeleted,
}) {
  const user = comment.author;
  const commentID = comment.comment_id;

  function deleteComment(e) {
    e.preventDefault();

    api.delete(`/comments/${commentID}`);

    setCommentDeleted(true);
  }

  return (
    <section className="comment-card">
      <p id="comment-text">{comment.author}</p>
      <p id="comment-text">{comment.body}</p>
      <p id="comment-text">{comment.created_at}</p>
      <p id="comment-text">Votes: {comment.votes}</p>

      {user === "jessjelly" ? (
        <button
          onClick={deleteComment}
          id="delete-button">
          Delete
        </button>
      ) : null}
    </section>
  );
}
