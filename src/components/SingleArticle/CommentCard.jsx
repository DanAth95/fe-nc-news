import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

export default function CommentCard({
  comment,
  commentList,
  setCommentList,
  setNoComments,
}) {
  const date = `${new Date(comment.created_at).getDate()}/${
    new Date(comment.created_at).getMonth() + 1
  }/${new Date(comment.created_at).getFullYear()}`;

  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const { user } = useContext(UserContext);

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
      <p>
        {comment.author} {date}
      </p>
      <p>{comment.body}</p>
      <p>Votes: {comment.votes}</p>
      {user.username === comment.author ? (
        <button onClick={handleClick} disabled={deleting ? true : false}>
          X
        </button>
      ) : null}
    </>
  );
}
