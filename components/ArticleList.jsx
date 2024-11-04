import axios from "axios";
import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";

export default function ArticleList({ topic }) {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    axios
      .get("https://nc-news-z5fx.onrender.com/api/articles")
      .then((response) => {
        setArticleList(response.data.articles);
      });
  }, []);

  console.log(articleList);

  return (
    <div>
      {articleList.map((article) => {
        return (
          <div key={article.article_id} className="article-card">
            <ArticleCard article={article} />
          </div>
        );
      })}
    </div>
  );
}
