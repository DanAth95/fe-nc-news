export default function CommentCard({ comment }) {
  const date = `${new Date(comment.created_at).getDate()}/${new Date(
    comment.created_at
  ).getMonth()}/${new Date(comment.created_at).getFullYear()}`;
  return (
    <>
      <p>
        {comment.author} {date}
      </p>
      <p>{comment.body}</p>
      <p>Votes: {comment.votes}</p>
    </>
  );
}
