import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

export default function CommentCard({
  comment,
  commentList,
  setCommentList,
  setNoComments,
  userList,
}) {
  const date = `${new Date(comment.created_at).getDate()}/${
    new Date(comment.created_at).getMonth() + 1
  }/${new Date(comment.created_at).getFullYear()}`;

  const hours = new Date(comment.created_at).getHours();
  const minutes = new Date(comment.created_at).getMinutes();
  const time = `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;

  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [votes, setVotes] = useState(comment.votes);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [disable, setDisable] = useState(false);

  const { user } = useContext(UserContext);

  function handlelike(e) {
    setError("");
    setDisable(true);
    if (disliked) {
      setVotes(Number(votes) + 2 * Number(e.target.value));
      setDisliked(false);
    } else {
      setVotes(Number(votes) + Number(e.target.value));
    }
    axios
      .patch(
        `https://nc-news-z5fx.onrender.com/api/comments/${comment.comment_id}`,
        {
          inc_votes: Number(e.target.value),
        }
      )
      .then(() => {
        setLiked(!liked);
        setDisable(false);
      })
      .catch((err) => {
        setError(err);
        setVotes(Number(votes) - Number(e.target.value));
        setDisable(false);
      });
  }

  function handledislike(e) {
    setDisable(true);
    setError("");
    if (liked) {
      setVotes(Number(votes) + 2 * Number(e.target.value));
      setLiked(false);
    } else {
      setVotes(Number(votes) + Number(e.target.value));
    }
    axios
      .patch(
        `https://nc-news-z5fx.onrender.com/api/comments/${comment.comment_id}`,
        {
          inc_votes: Number(e.target.value),
        }
      )
      .then(() => {
        setDisliked(!disliked);
        setDisable(false);
      })
      .catch((err) => {
        setError(err);
        setVotes(Number(votes) - Number(e.target.value));
        setDisable(false);
      });
  }

  const avatarURL = userList.filter((u) => {
    return u.username === comment.author;
  })[0].avatar_url;

  function handleClick() {
    setDeleting(true);
    setCommentList(
      commentList.filter((c) => {
        return c.comment_id !== comment.comment_id;
      })
    );
    axios
      .delete(
        `https://nc-news-z5fx.onrender.com/api/comments/${comment.comment_id}`
      )
      .then(() => {
        setDeleting(false);
        if (commentList.length === 1) {
          setNoComments(true);
        }
      })
      .catch((err) => {
        setError(err);
      });
  }

  return (
    <>
      <div className="comment">
        <div className="comment-body">
          <img className="avatar" src={avatarURL} alt={comment.author} />
          <p>{comment.author}</p>
          <p className="comment-text">{comment.body}</p>
        </div>
        {user.username === comment.author ? (
          <button
            className="delete-btn"
            onClick={handleClick}
            disabled={deleting ? true : false}
          >
            X
          </button>
        ) : null}
      </div>
      <div className="comment-bottom">
        <p>
          {date} {time}
        </p>
        <div className="comment-votes">
          <button
            value={liked ? -1 : 1}
            style={
              liked
                ? { backgroundColor: "#b80000", color: "#f5f5f5" }
                : { backgroundColor: "#f5f5f5" }
            }
            disabled={disable ? true : false}
            onClick={handlelike}
          >
            ⬆
          </button>
          {error ? <p>{error}</p> : <p>Votes: {votes}</p>}
          <button
            value={disliked ? 1 : -1}
            style={
              disliked
                ? { backgroundColor: "#b80000", color: "#f5f5f5" }
                : { backgroundColor: "#f5f5f5" }
            }
            disabled={disable ? true : false}
            onClick={handledislike}
          >
            ⬇
          </button>
        </div>
      </div>
    </>
  );
}
