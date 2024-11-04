import Header from "../components/Header";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import ArticleList from "../components/ArticleList";
import Article from "../components/SingleArticle/Article";
import CommentList from "../components/SingleArticle/CommentList";

function App() {
  const [topic, setTopic] = useState("");
  const [article, setArticle] = useState({});

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
              <Article article={article} />
              <CommentList article={article} />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
