import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

export default function NewComment({ setCommentList, commentList, article }) {
  const [newComment, setNewComment] = useState("Add a comment...");
  const [posting, setPosting] = useState(false);

  const { user } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    setPosting(true);
    const postingComment = {
      body: newComment,
      username: user.username,
    };

    const dateNow = new Date().toDateString();

    setCommentList([
      {
        author: user.username,
        body: newComment,
        votes: 0,
        created_at: dateNow,
      },
      ...commentList,
    ]);
    axios
      .post(
        `https://nc-news-z5fx.onrender.com/api/articles/${article.article_id}/comments`,
        postingComment
      )
      .then(() => {
        setPosting(false);
      });
  }

  function handleChange(e) {
    setNewComment(e.target.value);
  }

  return (
    <div id="newComment">
      <form>
        <input
          type="text"
          value={newComment}
          onChange={handleChange}
          onClick={(e) => {
            if (newComment === "Add a comment...") {
              e.target.value = "";
            }
          }}
          onBlur={(e) => {
            if (!e.target.value) {
              e.target.value = "Add a comment...";
            }
          }}
        />
        <input
          type="submit"
          onClick={handleSubmit}
          value={posting ? "posting..." : "Submit"}
          disabled={posting ? true : false}
        />
      </form>
    </div>
  );
}
