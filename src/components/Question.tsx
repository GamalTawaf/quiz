import Board from './Board';

function Question({ questions, questionIndex }: QuestionProps) {
  const question: Question = questions[questionIndex];
  return (
    <Board className="pt-7 pb-[30px] mb-[22px]">
      <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-chalk-dim mb-3.5">
        Question {questionIndex + 1}
      </p>
      <h1 className="font-body font-bold text-[clamp(21px,4vw,30px)] leading-[1.28] text-balance text-chalk m-0">
        {decodeURIComponent(question.question)}
      </h1>
    </Board>
  )
}

export default Question
