import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function Navbar({ setTopic, setArticle, topic }) {
  const [topicList, setTopicList] = useState([]);

  useEffect(() => {
    axios
      .get("https://nc-news-z5fx.onrender.com/api/topics")
      .then((response) => {
        setTopicList(response.data.topics);
      });
  }, []);

  function handleClick(e) {
    setTopic(e.target.id);
  }

  return (
    <ul id="navbar">
      <li>
        <Link
          to="/"
          onClick={() => {
            setTopic("");
            setArticle({});
          }}
        >
          Home
        </Link>
      </li>
      {useLocation().pathname === "/" ? (
        <>
          {topicList.map((t) => {
            return (
              <li key={t.slug}>
                <Link id={t.slug} onClick={handleClick} to={`?topic=${t.slug}`}>
                  {t.slug}
                </Link>
              </li>
            );
          })}
          <div className="dropdown">
            <button className="dropbtn">sort by</button>
            <div className="dropdown-content">
              <Link to={`?${topic ? `topic=${topic}&` : ``}sort_by=created_at`}>
                date (most recent)
              </Link>
              <Link
                to={`?${
                  topic ? `topic=${topic}&` : ``
                }sort_by=created_at&order=asc`}
              >
                date (oldest)
              </Link>
              <Link
                to={`?${topic ? `topic=${topic}&` : ``}sort_by=comment_count`}
              >
                comments (most)
              </Link>
              <Link
                to={`?${
                  topic ? `topic=${topic}&` : ``
                }sort_by=comment_count&order=asc`}
              >
                comments (least)
              </Link>
              <Link to={`?${topic ? `topic=${topic}&` : ``}sort_by=votes`}>
                votes (most popular)
              </Link>
              <Link
                to={`?${topic ? `topic=${topic}&` : ``}sort_by=votes&order=asc`}
              >
                votes (least popular)
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </ul>
  );
}
