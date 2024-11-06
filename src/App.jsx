import Header from "./components/Header";
import { Routes, Route, useLocation, useSearchParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState, useEffect, useContext } from "react";
import ArticleList from "./components/ArticleList";
import Article from "./components/SingleArticle/Article";
import NotFound from "./components/NotFound";
import { UserContext } from "./contexts/UserContext";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [topic, setTopic] = useState(searchParams.get("topic") ?? "");
  const [sortBy, setSortBy] = useState(searchParams.get("sort_by") ?? "");
  const [order, setOrder] = useState(searchParams.get("order") ?? "");
  const [article, setArticle] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    setTopic(searchParams.get("topic") ?? "");
    setSortBy(searchParams.get("sort_by") ?? "");
    setOrder(searchParams.get("order") ?? "");
  }, [searchParams]);

  return (
    <>
      <header>
        <Header />
      </header>
      <nav>
        <Navbar
          setTopic={setTopic}
          setArticle={setArticle}
          topic={topic}
          setPage={setPage}
        />
      </nav>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ArticleList
                  topic={topic}
                  sortBy={sortBy}
                  order={order}
                  page={page}
                  setPage={setPage}
                />{" "}
              </>
            }
          />
          <Route
            path="/article/:article_id"
            element={
              <>
                <Article article={article} setArticle={setArticle} />
              </>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
