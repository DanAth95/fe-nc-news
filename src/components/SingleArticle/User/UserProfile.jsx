import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import axios, { all } from "axios";
import ArticleCard from "../../ArticleCard";

export default function UserProfile() {
  const { user } = useContext(UserContext);
  const [userArticles, setUserArticles] = useState([]);

  useEffect(() => {
    axios
      .get("https://nc-news-z5fx.onrender.com/api/articles?limit=100")
      .then((response) => {
        const allArticles = response.data.articles;
        setUserArticles(
          allArticles.filter((article) => {
            return article.author === user.username;
          })
        );
      });
  }, [userArticles]);

  return (
    <div className="user-profile">
      <h2>{`${user.username.toUpperCase()}'s PROFILE`}</h2>
      <img src={user.avatar_url} alt="" width="350px" />
      <p>Username: {user.username}</p>
      <p>Name: {user.name}</p>
      <h3>YOUR ARTICLES</h3>
      <div className="article-list">
        {userArticles.map((article) => {
          return (
            <div key={article.article_id} className="article-card">
              <ArticleCard
                article={article}
                userArticles={userArticles}
                setUserArticles={setUserArticles}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
