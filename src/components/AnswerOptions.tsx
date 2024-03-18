import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/16/solid';


export default function AnswerOptions({ questions, questionIndex, userAnswers, answerOptions, cheatMode }: AnswerProps) {
  const question: Question = questions[questionIndex];
  const [selected, setSelected] = useState<string>('');
  // if we have a userAnswers then show it if user moves back and forth between questions
  // make sure it does not match current to prevent infinite rerender
  if(userAnswers.current.length > 0 && userAnswers.current[questionIndex] && selected != userAnswers.current[questionIndex].user_answer) {
    setSelected(userAnswers.current[questionIndex].user_answer);
  }
  // get the options by combining all answers
  if(question != null && answerOptions.current[questionIndex] == null) {
    answerOptions.current[questionIndex] = [...question.incorrect_answers, ...[question.correct_answer]];
    // if we keep as above then always last answer will be correct so we need to shuffle answers
    //we need to prevent reshuffle once selection and then rerender
    answerOptions.current[questionIndex] = shuffleAnswers(answerOptions.current[questionIndex]);
  }

  const handleChange = (answer: string) => {
    setSelected(answer);
    // we add 1 as second param to replace item if it exists otherwise just add it
    userAnswers.current.splice(questionIndex, 1, {'user_answer':answer, 'answered_correctly': answer === question.correct_answer});
  }
  return (
    <RadioGroup value={selected} onChange={handleChange}>
      <div className="space-y-4">
        {answerOptions.current[questionIndex].map((answerOption) => (
          <RadioGroup.Option
            key={answerOption}
            value={answerOption}
            className={({ active, checked }) =>
              `${active
                ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300'
                : ''
              }
                  ${checked ? 'bg-sky-900/75 text-white' : 'bg-white'}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                    
              }
          >
            {({ active, checked }) => (
              <>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <RadioGroup.Label
                        as="p"
                        className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'
                          }`}
                      >
                        {decodeURIComponent(answerOption)}
                      </RadioGroup.Label>
                    </div>
                  </div>
                  {checked && (
                    <div className="shrink-0 text-white h-6 w-6">
                      <CheckCircleIcon />
                    </div>
                  )}
                </div>
                { cheatMode && question.correct_answer == answerOption && 
                <span className="absolute min-w-[12px] min-h-[12px] rounded-md py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center bottom-[4%] right-[10%] translate-x-2/4 translate-y-2/4 bg-green-500 text-white border-2">
                  Correct Answer
                </span>
                }
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}

// used from https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/ 
function shuffleAnswers(answersArray: string[]) : string[] {
  for (let i = answersArray.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [answersArray[i], answersArray[j]] = [answersArray[j], answersArray[i]]; 
  } 
  return answersArray; 
}
