import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentList from "./CommentList";

export default function Article({ article, setArticle }) {
  const { article_id } = useParams();
  const [votes, setVotes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const date = `${new Date(article.created_at).getDate()}/${new Date(
    article.created_at
  ).getMonth()}/${new Date(article.created_at).getFullYear()}`;

  useEffect(() => {
    setError("");
    setIsLoading(true);
    axios
      .get(`https://nc-news-z5fx.onrender.com/api/articles/${article_id}`)
      .then((response) => {
        setArticle(response.data.article);
        setVotes(response.data.article.votes);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  function handlelike(e) {
    setError("");
    setDisable(true);
    if (disliked) {
      setVotes(Number(votes) + 2 * Number(e.target.value));
      setDisliked(false);
    } else {
      setVotes(Number(votes) + Number(e.target.value));
    }
    axios
      .patch(`https://nc-news-z5fx.onrender.com/api/articles/${article_id}`, {
        inc_votes: Number(e.target.value),
      })
      .then(() => {
        setLiked(!liked);
        setDisable(false);
      })
      .catch((err) => {
        setError(err);
        setVotes(Number(votes) - Number(e.target.value));
        setDisable(false);
      });
  }

  function handledislike(e) {
    setDisable(true);
    setError("");
    if (liked) {
      setVotes(Number(votes) + 2 * Number(e.target.value));
      setLiked(false);
    } else {
      setVotes(Number(votes) + Number(e.target.value));
    }
    axios
      .patch(`https://nc-news-z5fx.onrender.com/api/articles/${article_id}`, {
        inc_votes: Number(e.target.value),
      })
      .then(() => {
        setDisliked(!disliked);
        setDisable(false);
      })
      .catch((err) => {
        setError(err);
        setVotes(Number(votes) - Number(e.target.value));
        setDisable(false);
      });
  }

  return (
    <div className="article">
      {error ? (
        <h2>Article Not Found</h2>
      ) : (
        <>
          <div className="article">
            {isLoading ? (
              <h2>Loading...</h2>
            ) : (
              <>
                <h2>{article.title}</h2>
                <p>
                  Written by: {article.author}, {date}
                </p>
                <img
                  src={article.article_img_url}
                  className="article-image"
                  alt=""
                />
                <p>Topic: {article.topic.toUpperCase()}</p>
                <p className="article-text">{article.body}</p>
                <div className="votes">
                  <button
                    value={liked ? -1 : 1}
                    style={
                      liked
                        ? { backgroundColor: "#b80000", color: "#f5f5f5" }
                        : { backgroundColor: "#f5f5f5" }
                    }
                    disabled={disable ? true : false}
                    onClick={handlelike}
                  >
                    ⬆
                  </button>
                  {error ? <p>{error}</p> : <p>Votes: {votes}</p>}
                  <button
                    value={disliked ? 1 : -1}
                    style={
                      disliked
                        ? { backgroundColor: "#b80000", color: "#f5f5f5" }
                        : { backgroundColor: "#f5f5f5" }
                    }
                    disabled={disable ? true : false}
                    onClick={handledislike}
                  >
                    ⬇
                  </button>
                </div>
              </>
            )}
          </div>
          <CommentList article={article} isLoading={isLoading} />
        </>
      )}
    </div>
  );
}
