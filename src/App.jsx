import Header from "../components/Header";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import ArticleList from "../components/ArticleList";

function App() {
  const [topic, setTopic] = useState("");
  return (
    <>
      <Header />
      <Navbar setTopic={setTopic} />
      <Routes>
        <Route path="/" element={<ArticleList topic={topic} />} />
      </Routes>
    </>
  );
}

export default App;
