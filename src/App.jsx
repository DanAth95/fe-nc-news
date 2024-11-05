import Header from "./components/Header";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import ArticleList from "./components/ArticleList";
import Article from "./components/SingleArticle/Article";
import CommentList from "./components/SingleArticle/CommentList";

function App() {
  const [topic, setTopic] = useState(
    window.location.search.split("=")[1] ?? ""
  );
  const [article, setArticle] = useState({});

  useEffect(() => {
    if (window.location.search) {
      setTopic(window.location.search.split("=")[1]);
    } else {
      setTopic("");
    }
  }, [window.location.search]);

  return (
    <>
      <Header />
      <Navbar setTopic={setTopic} setArticle={setArticle} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ArticleList topic={topic} setArticle={setArticle} />{" "}
            </>
          }
        />
        <Route
          path="/article/:article_id"
          element={
            <>
              <Article article={article} setArticle={setArticle} />
              <CommentList article={article} />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
