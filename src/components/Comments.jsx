import { useState } from "react";
import { FiMessageCircle, FiTrash2 } from "react-icons/fi";
import { useAppData } from "./useAppData.js";
import "./Comments.css";

const Comments = ({
  seriesId,
  seasonNumber = null,
  episodeNumber = null,
}) => {
  const { data, addComment, removeComment } = useAppData();
  const [text, setText] = useState("");
  const [spoiler, setSpoiler] = useState(false);

  const comments = data.comments.filter(
    (comment) =>
      comment.seriesId === seriesId &&
      comment.seasonNumber === seasonNumber &&
      comment.episodeNumber === episodeNumber
  );

  const submit = () => {
    const value = text;

    if (!value) return;

    addComment({
      seriesId,
      seasonNumber,
      episodeNumber,
      author: "Você",
      text: value,
      spoiler,
    });

    setText("");
    setSpoiler(false);
  };

  return (
    <section className="comments-box">
      <h2>
        <FiMessageCircle /> Comentários
        {episodeNumber ? ` · T${seasonNumber}E${episodeNumber}` : ""}
      </h2>

      <div className="comment-form">
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
              submit();
            }
          }}
          placeholder="Escreva um comentário..."
        />

        <div className="comment-form__actions">
          <label>
            <input
              type="checkbox"
              checked={spoiler}
              onChange={(event) => setSpoiler(event.target.checked)}
            />
            Contém spoiler
          </label>

          <button
            className="btn btn-primary"
            onClick={submit}
            disabled={text === ""}
          >
            Publicar comentário
          </button>
        </div>
      </div>

      <div className="comments-list">
        {comments.length === 0 ? (
          <p>Nenhum comentário ainda. Seja o primeiro a comentar.</p>
        ) : (
          comments.map((comment) => (
            <article className="comment" key={comment.id}>
              <div>
                <b>{comment.author}</b>
                <small>Comentário publicado</small>
              </div>

              {comment.spoiler ? (
                <details>
                  <summary>⚠️ Mostrar spoiler</summary>
                  <p>{comment.text}</p>
                </details>
              ) : (
                <p>{comment.text}</p>
              )}

              {comment.author === "Você" && (
                <button
                  className="comment-delete"
                  onClick={() => removeComment(comment.id)}
                  aria-label="Excluir comentário"
                >
                  <FiTrash2 />
                </button>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default Comments;
