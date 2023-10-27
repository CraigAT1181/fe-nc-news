import api from "../api/api";

export default function CommentCard({ comment }) {

  function deleteComment (e) {
    e.preventDefault()
    setIsLoading(true)

    // api.delete(`/articles/${article_id}/comments/${newComment.comment_id}`)
  }


  return (
    <section className="comment-card">
      <p id="comment-text">{comment.author}</p>
      <p id="comment-text">{comment.body}</p>
      <p id="comment-text">{comment.created_at}</p>
      <p id="comment-text">Votes: {comment.votes}</p>
      <button onClick={deleteComment} id="delete-button">Delete</button>
    </section>
  );
}
