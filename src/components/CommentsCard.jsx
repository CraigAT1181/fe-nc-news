export default function CommentCard({ comment }) {
  return (
    <section className="comment-card">
      <p id="comment-text">{comment.author}</p>
      <p id="comment-text">{comment.body}</p>
      <p id="comment-text">{comment.created_at}</p>
      <p id="comment-text">Votes: {comment.votes}</p>
    </section>
  );
}
