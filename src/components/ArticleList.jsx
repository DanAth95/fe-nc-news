import axios from "axios";
import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";

export default function ArticleList({ topic, sortBy, order }) {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    setIsLoading(true);
    axios
      .get(
        `https://nc-news-z5fx.onrender.com/api/articles?topic=${topic}&sort_by=${sortBy}&order=${order}`
      )
      .then((response) => {
        setArticleList(response.data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.msg);
      });
  }, [topic, sortBy, order]);

  return (
    <>
      {error ? (
        <h2>{error}</h2>
      ) : (
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
      )}
    </>
  );
}
