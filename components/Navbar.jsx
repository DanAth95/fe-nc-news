import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function Navbar({ setTopic, setArticle }) {
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
      {useLocation().pathname === "/"
        ? topicList.map((topic) => {
            return (
              <li key={topic.slug}>
                <Link id={topic.slug} onClick={handleClick}>
                  {topic.slug}
                </Link>
              </li>
            );
          })
        : null}
    </ul>
  );
}
