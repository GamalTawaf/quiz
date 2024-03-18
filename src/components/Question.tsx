
function Question({ questions, questionIndex }: QuestionProps) {
  const question: Question = questions[questionIndex];
  return (
    <div className="bg-sky-800/80 relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none mb-5">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <div>
            <div className="absolute inline-flex items-center justify-center w-10 h-10 text-s text-white bg-green-400 font-bold border-2 border-white rounded-full top-[-20%] right-[50%] dark:border-gray-900">
            {questionIndex+1}/{questions.length}
            </div>
            <p className="font-bold text-xl text-white">Question </p>
            <span className="inline text-lg font-medium text-white">
              {decodeURIComponent(question.question)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Question