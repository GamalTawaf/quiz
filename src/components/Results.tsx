import Board from './Board';
import PillButton from './PillButton';

export default function Results({ questions, answers, onPlayAgain }: ResultsProps) {
  // calculate the results for display
  const correctAnswers: number = answers.current.filter( answer => answer.answered_correctly).length;
  const successRate: number = Math.round((correctAnswers / questions.length) * 100);
  const questionsAnswered: number = answers.current.filter(Boolean).length;
  const passed = successRate >= 50;

  return (
    <Board className="pt-8 pb-8 text-center">
      <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-chalk-dim mb-3">
        Final Score
      </p>
      <p className={`font-display text-5xl ${passed ? 'text-correct' : 'text-buzzer'} [text-shadow:0_0_18px_currentColor] mb-5`}>
        {successRate}%
      </p>
      <p className="font-body text-chalk mb-1">
        {correctAnswers} correct out of {questionsAnswered} answered
      </p>
      <p className="font-mono text-xs text-chalk-dim mb-7">
        {questions.length} questions total
      </p>
      <PillButton type="button" onClick={onPlayAgain}>
        Play Again
      </PillButton>
    </Board>
  )
}
