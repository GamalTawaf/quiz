import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'


export default function AnswerOptions({ questions, questionIndex, userAnswers, answerOptions, cheatMode }: AnswerProps) {
  const question: Question = questions[questionIndex];
  const [selected, setSelected] = useState<string>('');
  const [trackedIndex, setTrackedIndex] = useState<number>(questionIndex);
  // question changed: resync selected to this question's recorded answer (or clear it)
  if (trackedIndex !== questionIndex) {
    setTrackedIndex(questionIndex);
    setSelected(userAnswers.current[questionIndex]?.user_answer ?? '');
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
    // record by index directly so skipped questions don't shift later answers
    userAnswers.current[questionIndex] = {'user_answer':answer, 'answered_correctly': answer === question.correct_answer};
  }
  return (
    <RadioGroup value={selected} onChange={handleChange}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-[22px]">
        {answerOptions.current[questionIndex].map((answerOption) => {
          const isCorrect = cheatMode && question.correct_answer == answerOption;
          const isSelectedWrong = cheatMode && selected === answerOption && answerOption !== question.correct_answer;
          const badge = isCorrect
            ? { text: 'Correct', className: 'bg-correct text-[#0f2312] -rotate-6' }
            : isSelectedWrong
              ? { text: '😏 Really?', className: 'bg-buzzer text-chalk rotate-6' }
              : null;
          return (
          <RadioGroup.Option
            key={answerOption}
            value={answerOption}
            className={({ active, checked }) =>
              `relative font-body font-medium text-[15px] text-left rounded-xl px-[18px] pt-4 pb-[18px] cursor-pointer transition-[transform,box-shadow] duration-150 focus:outline-none
              ${active ? 'ring-2 ring-gold ring-offset-2 ring-offset-chalkboard' : ''}
              ${checked
                ? 'bg-ink text-chalk shadow-paddle-active translate-y-0.5'
                : isCorrect
                  ? 'bg-[#e7f3e6] text-ink shadow-paddle-correct hover:-translate-y-0.5 hover:shadow-paddle-hover'
                  : 'bg-chalk text-ink shadow-paddle hover:-translate-y-0.5 hover:shadow-paddle-hover'
              }`
              }
          >
            <RadioGroup.Label as="p">
              {decodeURIComponent(answerOption)}
            </RadioGroup.Label>
            {badge &&
              <span className={`absolute -top-2.5 -right-2 font-mono font-semibold text-[10px] tracking-[0.1em] uppercase px-2 py-1 rounded-[5px] shadow-[0_2px_6px_rgba(0,0,0,0.35)] ${badge.className}`}>
                {badge.text}
              </span>
            }
          </RadioGroup.Option>
          );
        })}
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
