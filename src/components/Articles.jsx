import { useEffect, useState } from "react";
import { fetchArticles } from "../api/api";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then(({ articles: articles }) => {
      setArticles(articles);
    });
  }, []);

  return (
    <section className="article-display">
      {articles.map((article) => {
        return (
          <article className="article" key={article.article_id}>
            <h2>{article.title}</h2>
            <p>Written by: {article.author}</p>
            <p>About: {article.topic}</p>
            <p>{article.created_at}</p>
            <p>Comments: {article.comment_count}</p>
            <p>Votes: {article.votes}</p>
            <img className="article-image"
              src={article.article_img_url}
              alt={`A cover picture reflecting the topic of ${article.topic}`}
            />
          </article>
        );
      })}
    </section>
  );
}
