import axios from "axios";
import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";

export default function ArticleList({ topic, sortBy, order, page, setPage }) {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalArticles, setTotalArticles] = useState(0);

  useEffect(() => {
    setError("");
    setIsLoading(true);
    axios
      .get(
        `https://nc-news-z5fx.onrender.com/api/articles?topic=${topic}&sort_by=${sortBy}&order=${order}&limit=12&p=${page}`
      )
      .then((response) => {
        setTotalArticles(response.data.total_count);
        setArticleList(response.data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.msg);
      });
  }, [topic, sortBy, order, page]);

  return (
    <>
      {error ? (
        <h2>{error}</h2>
      ) : (
        <>
          {isLoading ? (
            <h2>Loading...</h2>
          ) : (
            <>
              <h2>{topic ? topic.toUpperCase() : "ALL ARTICLES"}</h2>
              <div className="article-list">
                {articleList.map((article) => {
                  return (
                    <div key={article.article_id} className="article-card">
                      <ArticleCard article={article} />
                    </div>
                  );
                })}
              </div>
              <div className="page-btns">
                {page === 1 ? null : (
                  <button
                    onClick={() => {
                      setPage(page - 1);
                    }}
                  >
                    {" "}
                    Previous Page
                  </button>
                )}
                <p>{page}</p>
                {page * 12 >= totalArticles ? null : (
                  <button
                    onClick={() => {
                      setPage(page + 1);
                    }}
                  >
                    Next Page
                  </button>
                )}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
