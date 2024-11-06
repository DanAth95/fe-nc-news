import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

export default function NewComment({
  setCommentList,
  commentList,
  article,
  setNoComments,
  posted,
  setPosted,
}) {
  const [newComment, setNewComment] = useState("Add a comment...");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const { user } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    setNoComments(false);
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
        setNewComment("");
        setPosted(posted + 1);
      })
      .catch((err) => {
        setError(true);
      });
  }

  function handleChange(e) {
    setIsEmpty(false);
    if (e.target.value === "") {
      setIsEmpty(true);
    }
    setNewComment(e.target.value);
  }

  return (
    <div id="newComment">
      <h4>Leave a Comment</h4>
      <p>You are logged in as {user.username}</p>
      <form>
        <label for="c">Type your comment here</label>
        <input
          id="c"
          className="comment-bar"
          type="text"
          value={newComment}
          onChange={handleChange}
          onClick={(e) => {
            if (e.target.value === "Add a comment...") {
              e.target.value = "";
            }
          }}
          onBlur={(e) => {
            if (e.target.value === "") {
              e.target.value = "Add a comment...";
            }
          }}
        />
        <input
          type="submit"
          onClick={handleSubmit}
          value={posting ? "posting..." : "Submit"}
          disabled={posting || isEmpty ? true : false}
        />
      </form>
      {error ? <p>Comment failed to post. Please try again</p> : null}
    </div>
  );
}
