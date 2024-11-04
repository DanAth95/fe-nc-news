import axios from "axios";
import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  const date = `${new Date(article.created_at).getDate()}/${new Date(
    article.created_at
  ).getMonth()}/${new Date(article.created_at).getFullYear()}`;

  return (
    <>
      <img src={article.article_img_url} />
      <div className="article-card-info">
        <h4>{article.title}</h4>
        <p>{article.author}</p>
        <p>{date}</p>
        <Link to={`/article/${article.article_id}`}>See Article</Link>
      </div>
    </>
  );
}