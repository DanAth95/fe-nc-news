import axios from "axios";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import NewComment from "./NewComment";

export default function CommentList({ article, isLoading }) {
  const [commentList, setCommentList] = useState([]);
  const [noComments, setNoComments] = useState(false);
  const [userList, setUserList] = useState([]);
  const [posted, setPosted] = useState(0);

  useEffect(() => {
    axios
      .get(`https://nc-news-z5fx.onrender.com/api/users`)
      .then((response) => {
        setUserList(response.data.users);
      });
  }, []);

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
  }, [article, posted]);

  return (
    <>
      {isLoading ? null : (
        <div className="comments">
          <h3>Comments</h3>
          <NewComment
            setCommentList={setCommentList}
            commentList={commentList}
            article={article}
            setNoComments={setNoComments}
            userList={userList}
            posted={posted}
            setPosted={setPosted}
          />
          {noComments ? (
            <p>No Comments</p>
          ) : (
            <div className="comment-list">
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
                      userList={userList}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}
