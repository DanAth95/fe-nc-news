import axios from "axios";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";

export default function CommentList({ article }) {
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    if (article.article_id) {
      axios
        .get(
          `https://nc-news-z5fx.onrender.com/api/articles/${article.article_id}/comments`
        )
        .then((response) => {
          setCommentList(response.data.comments);
        });
    }
  }, [article]);

  return (
    <>
      <h3>Comments</h3>
      <div id="comment-list">
        {commentList.map((comment) => {
          return (
            <div key={comment.comment_id} className="comment-card">
              <CommentCard comment={comment} />
            </div>
          );
        })}
      </div>
    </>
  );
}
