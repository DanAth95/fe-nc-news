import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

export default function Navbar({ setTopic, setArticle, topic }) {
  const [topicList, setTopicList] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("https://nc-news-z5fx.onrender.com/api/topics")
      .then((response) => {
        setTopicList(response.data.topics);
      });
  }, []);

  function handleClick(e) {
    console.log(e.target.id);
    setPage(1);
    setTopic(e.target.id);
  }

  return (
    <ul id="navbar">
      <li>
        <Link
          to="/"
          onClick={() => {
            setTopic("");
            setPage(1);
            setArticle({});
          }}
        >
          HOME
        </Link>
      </li>
      {useLocation().pathname === "/" ? (
        <>
          <div className="dropdown">
            <button className="dropbtn">TOPIC</button>
            <div className="dropdown-content">
              {topicList.map((t) => {
                return (
                  <li key={t.slug}>
                    <Link
                      id={t.slug}
                      to={`/?topic=${t.slug}`}
                      onClick={handleClick}
                    >
                      {t.slug.toUpperCase()}
                    </Link>
                  </li>
                );
              })}
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">SORT BY</button>
            <div className="dropdown-content">
              <Link to={`?${topic ? `topic=${topic}&` : ``}sort_by=created_at`}>
                Date (most recent)
              </Link>
              <Link
                to={`?${
                  topic ? `topic=${topic}&` : ``
                }sort_by=created_at&order=asc`}
              >
                Date (oldest)
              </Link>
              <Link
                to={`?${topic ? `topic=${topic}&` : ``}sort_by=comment_count`}
              >
                Comments (most)
              </Link>
              <Link
                to={`?${
                  topic ? `topic=${topic}&` : ``
                }sort_by=comment_count&order=asc`}
              >
                Comments (least)
              </Link>
              <Link to={`?${topic ? `topic=${topic}&` : ``}sort_by=votes`}>
                Votes (most popular)
              </Link>
              <Link
                to={`?${topic ? `topic=${topic}&` : ``}sort_by=votes&order=asc`}
              >
                Votes (least popular)
              </Link>
            </div>
          </div>
        </>
      ) : null}
      <li>
        <Link to={user.username ? "/user" : "/sign-in"}>
          {user.username ? "ACCOUNT" : "SIGN IN"}
        </Link>
      </li>
    </ul>
  );
}
