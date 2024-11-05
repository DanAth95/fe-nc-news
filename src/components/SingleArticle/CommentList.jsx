import axios from "axios";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import NewComment from "./NewComment";

export default function CommentList({ article }) {
  const [commentList, setCommentList] = useState([]);
  const [noComments, setNoComments] = useState(false);

  useEffect(() => {
    setNoComments(false);
    if (article.article_id) {
      axios
        .get(
          `https://nc-news-z5fx.onrender.com/api/articles/${article.article_id}/comments`
        )
        .then((response) => {
          if (response.data.msg) {
            setNoComments(true);
            setCommentList([]);
          } else {
            setCommentList(response.data.comments);
          }
        });
    }
  }, [article, commentList.length]);

  return (
    <>
      <h3>Comments</h3>
      <NewComment
        setCommentList={setCommentList}
        commentList={commentList}
        article={article}
        setNoComments={setNoComments}
      />
      {noComments ? (
        <p>No Comments</p>
      ) : (
        <div id="comment-list">
          {commentList.map((comment) => {
            return (
              <div
                key={comment.body + comment.comment_id}
                className="comment-card"
              >
                <CommentCard
                  comment={comment}
                  commentList={commentList}
                  setCommentList={setCommentList}
                  setNoComments={setNoComments}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
