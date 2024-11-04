import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Article({ article, setArticle }) {
  const { article_id } = useParams();
  const [votes, setVotes] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const date = `${new Date(article.created_at).getDate()}/${new Date(
    article.created_at
  ).getMonth()}/${new Date(article.created_at).getFullYear()}`;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://nc-news-z5fx.onrender.com/api/articles/${article_id}`)
      .then((response) => {
        setArticle(response.data.article);
        setVotes(response.data.article.votes);
        setIsLoading(false);
      });
  }, []);

  function handleClick(e) {
    setError("");
    setVotes(votes + Number(e.target.value));
    axios
      .patch(`https://nc-news-z5fx.onrender.com/api/articles/${article_id}`, {
        inc_votes: Number(e.target.value),
      })
      .catch((err) => {
        setError(err);
      });
  }

  return (
    <div className="article">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>{article.title}</h2>
          <p>
            Written by: {article.author}, {date}
          </p>
          <img src={article.article_img_url} />
          <p>{article.topic}</p>
          <p>{article.body}</p>
          <button value={1} onClick={handleClick}>
            ↑
          </button>
          {error ? <p>{error}</p> : <p>Votes: {votes}</p>}
          <button value={-1} onClick={handleClick}>
            ↓
          </button>
        </>
      )}
    </div>
  );
}
