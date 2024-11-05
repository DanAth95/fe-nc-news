import Header from "./components/Header";
import { Routes, Route, useLocation, useSearchParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import ArticleList from "./components/ArticleList";
import Article from "./components/SingleArticle/Article";
import CommentList from "./components/SingleArticle/CommentList";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [topic, setTopic] = useState(searchParams.get("topic") ?? "");
  const [sortBy, setSortBy] = useState(searchParams.get("sort_by") ?? "");
  const [order, setOrder] = useState(searchParams.get("order") ?? "");
  const [article, setArticle] = useState({});

  useEffect(() => {
    setTopic(searchParams.get("topic") ?? "");
    setSortBy(searchParams.get("sort_by") ?? "");
    setOrder(searchParams.get("order") ?? "");
  }, [searchParams]);

  return (
    <>
      <Header />
      <Navbar setTopic={setTopic} setArticle={setArticle} topic={topic} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ArticleList topic={topic} sortBy={sortBy} order={order} />{" "}
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
