export function TaskComment({ html }) {
  return (
    <div
      className="comment-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}