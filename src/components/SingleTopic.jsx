import ArticleCard from "./ArticleCard";

export default function SingleTopic({ articlesByTopic }) {
  return (
    <section className="article-display">
      {articlesByTopic.map((article) => {
        return (
          <ArticleCard
            key={article.article_id}
            article={article}
          />
        );
      })}
    </section>
  );
}
