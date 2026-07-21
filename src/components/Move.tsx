import PillButton from './PillButton';

function Move({questionIndex, questions, handleMove, finished, setFinished}: MoveProps) {
  return (
    <div className="flex items-center justify-center gap-5 pt-1">
      {questionIndex - 1 >= 0 &&
        <button
          type="button"
          aria-label="Previous question"
          onClick={() => handleMove(-1)}
          className="w-[42px] h-[42px] rounded-full border border-chalk/[0.18] bg-chalk/[0.06] text-chalk text-lg flex items-center justify-center hover:bg-chalk/[0.14] hover:-translate-y-px transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
        >
          ‹
        </button>
      }
      {questionIndex + 1 < questions.length &&
        <button
          type="button"
          aria-label="Next question"
          onClick={() => handleMove(1)}
          className="w-[42px] h-[42px] rounded-full border border-chalk/[0.18] bg-chalk/[0.06] text-chalk text-lg flex items-center justify-center hover:bg-chalk/[0.14] hover:-translate-y-px transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
        >
          ›
        </button>
      }
      {!finished && questionIndex + 1 === questions.length &&
        <PillButton type="button" onClick={() => setFinished(true)}>
          Submit
        </PillButton>
      }
    </div>
  )
}

export default Move
