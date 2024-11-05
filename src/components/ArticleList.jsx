import axios from "axios";
import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";

export default function ArticleList({ topic }) {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://nc-news-z5fx.onrender.com/api/articles?topic=${topic}`)
      .then((response) => {
        setArticleList(response.data.articles);
        setIsLoading(false);
      });
  }, [topic]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        articleList.map((article) => {
          return (
            <div key={article.article_id} className="article-card">
              <ArticleCard article={article} />
            </div>
          );
        })
      )}
    </div>
  );
}
