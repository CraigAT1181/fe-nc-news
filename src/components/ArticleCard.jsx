import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  const linkStyle = {
    textDecoration: "none",
    color: "black",
  };

  const date = new Date(article.created_at);

  return (
    <article
      className="article"
      key={article.article_id}>
      <h2>
        <Link
          style={linkStyle}
          to={`/articles/${article.article_id}`}>
          {article.title}
        </Link>
      </h2>
      <p>Written by: {article.author}</p>
      <p>About: {article.topic}</p>
      <p>{date.toDateString()}</p>
      <p>Comments: {article.comment_count}</p>
      <p>Votes: {article.votes}</p>
      <Link to={`/articles/${article.article_id}`}>
        <img
          className="article-image"
          src={article.article_img_url}
          alt={`A cover picture reflecting the topic of ${article.topic}`}
        />
      </Link>
    </article>
  );
}
