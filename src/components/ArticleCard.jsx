import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ArticleCard({
  article,
  userArticles,
  setUserArticles,
}) {
  const date = `${new Date(article.created_at).getDate()}/${new Date(
    article.created_at
  ).getMonth()}/${new Date(article.created_at).getFullYear()}`;

  const [isProfile, setIsProfile] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/user") {
      setIsProfile(true);
    } else {
      setIsProfile(false);
    }
  }, []);

  function handleDelete() {
    setDeleting(true);
    axios
      .delete(
        `https://nc-news-z5fx.onrender.com/api/articles/${article.article_id}`
      )
      .then(() => {
        setDeleting(false);
        setUserArticles(
          userArticles.filter((a) => {
            return a.id !== article.id;
          })
        );
      });
  }

  return (
    <>
      {deleting ? (
        <p>Deleting Article...</p>
      ) : (
        <>
          {isProfile ? (
            <Link
              onClick={() => {
                setPopup(true);
              }}
              className="delete-article-btn"
            >
              X
            </Link>
          ) : null}
          <img src={article.article_img_url} alt="" />
          <div className="article-card-info">
            <h4>{article.title}</h4>
            <p>{article.author}</p>
            <p>{date}</p>
            <Link to={`/article/${article.article_id}`}>See Article</Link>
          </div>
          <div
            id="delete-popup"
            className="delete-popup"
            style={popup ? { display: "block" } : { display: "none" }}
          >
            <p>Are you sure you want to delete this article?</p>
            <div className="pop-up-btns">
              <button onClick={handleDelete}>Yes</button>
              <button
                onClick={() => {
                  setPopup(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
