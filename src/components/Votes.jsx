export default function Votes({ vote, setVote, articleVotes }) {
  function commitVote(e) {
    e.preventDefault();
    setVote(vote + Number(e.target.value));
  }

  return (
    <>
      <p id="vote-count">
        <button
          onClick={commitVote}
          id="upvote"
          aria-label="upvote"
          value={1}
          disabled={vote === 1}>
          +
        </button>
        {articleVotes + vote}
        <button
          onClick={commitVote}
          id="downvote"
          aria-label="downvote"
          value={-1}
          disabled={vote === -1}>
          -
        </button>
      </p>
    </>
  );
}
