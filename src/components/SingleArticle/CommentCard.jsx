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

  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const { user } = useContext(UserContext);

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
          <img className="avatar" src={avatarURL} />
          {/* <p>{comment.author}</p> */}
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
        <p>{date}</p>
        <p>Votes: {comment.votes}</p>
      </div>
    </>
  );
}
