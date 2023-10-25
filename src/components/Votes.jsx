import api from "../api/api";
import { useState } from "react";

export default function Votes({ articleVotes, article_id }) {
  const [error, setError] = useState(null);
  const [vote, setVote] = useState(0);

  function commitVote(e) {
    e.preventDefault();
    setVote(vote + Number(e.target.value));

    api
      .patch(`/articles/${article_id}`, {
        inc_votes: Number(e.target.value),
      })

      .catch(
        ({
          response: {
            data: { msg },
            status,
          },
        }) => {
          setError({ status, message: msg });
          setVote(0)
        }
      );
  }

  if (error)
    return (
      <p>
        Error {error.status} {error.message}
      </p>
    );

  return (
    <>
      <p id="vote-count">
        <button
          onClick={commitVote}
          id="downvote"
          aria-label="downvote"
          value={-1}
          disabled={vote === -1}>
          -
        </button>

        {articleVotes + vote}

        <button
          onClick={commitVote}
          id="upvote"
          aria-label="upvote"
          value={1}
          disabled={vote === 1}>
          +
        </button>
      </p>
    </>
  );
}
