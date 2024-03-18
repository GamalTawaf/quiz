import { XCircleIcon } from "@heroicons/react/16/solid";
import { CheckCircleIcon } from "@heroicons/react/16/solid";

export default function Results({ questions, answers }: ResultsProps) {
  // calculate the results for display
  const correctAnswers: number = answers.current.filter( answer => answer.answered_correctly).length;
  const successRate: number = (correctAnswers / questions.length)* 100;
  const questionsAnswered: number = answers.current.length;

  return (
    <div className={(successRate >= 50 ? 'bg-emerald-400' : 'bg-red-500' ) + " cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none mb-5 w-3/5"}>
      <div className="text-md font-bold text-gray-900">
        <div className="pb-10 flex justify-center">
          {successRate >= 50 && <CheckCircleIcon className="h-40 w-40 text-white" />}
          {successRate < 50 && <XCircleIcon className="h-40 w-40 text-white" />}
        </div>
        <p className="pb-5">
          Success rate is {successRate}
        </p>
        <p className="pb-5">
          Answered {questionsAnswered} questions of {questions.length}
        </p>
        <p>
          Total correct answers {correctAnswers}
        </p>
      </div>
    </div>
  )
}
