import { Link } from "react-router-dom";

export default function TopicCard({ topic }) {
    const linkStyle = {
        textDecoration: "none",
        color: "black",
      };
  
    return (
        
    <article
      className="topic"
      key={topic.slug}>
        <Link style={linkStyle} to={`/articles?topic=${topic.slug}`}>
      <h2>{topic.slug}</h2>
      </Link>
      <p>{topic.description}</p>
    </article>
    
  );
}
