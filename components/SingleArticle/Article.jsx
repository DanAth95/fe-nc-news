export default function Article({ article }) {
  const date = `${new Date(article.created_at).getDate()}/${new Date(
    article.created_at
  ).getMonth()}/${new Date(article.created_at).getFullYear()}`;
  return (
    <div className="article">
      <h2>{article.title}</h2>
      <p>
        Written by: {article.author}, {date}
      </p>
      <img src={article.article_img_url} />
      <p>{article.topic}</p>
      <p>{article.body}</p>
      <p>Votes: {article.votes}</p>
    </div>
  );
}
