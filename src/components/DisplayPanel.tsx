
import Move from './Move';
import Results from './Results';
import Question from './Question';
import AnswerOptions from './AnswerOptions';
import QuestionsConfig from './QuestionsConfig';
import { useEffect, useRef, useState } from 'react';

function DisplayPanel() {
  // define variable needs for display
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);
  const [questionsUrl, setQuestionsUrl] = useState<string>('');
  const answerOptions = useRef<string[][]>([]);
  const [cheatMode, setCheatMode] = useState<boolean>(false);
  const answers = useRef<Answer[]>([]);


  // get questions
  // will make call again when questionsUrl changes
  useEffect(() => {
    if (questionsUrl.length === 0) return;
    fetch(questionsUrl)
      .then(response => response.json())
      .then(data => {
        if (data.response_code === 0) {
          setQuestions(data.results);
        }
      })
      .catch(() => {
        setQuestions([]);
      });

  }, [questionsUrl])
  // handles moving between questions and results
  const handleMove = (step: number) => {
    const newIndex = questionIndex + step;
    if (newIndex < questions.length && newIndex >= 0) {
      setFinished(false)
      setQuestionIndex(newIndex)
    }
  }
  // resets the quiz back to the configuration screen
  const handlePlayAgain = () => {
    answers.current = [];
    answerOptions.current = [];
    setQuestionIndex(0);
    setFinished(false);
    setQuestions([]);
    setQuestionsUrl('');
  }
  return (
    <>
      {/*if questionsUrl is 0 then we need to get url with configuration */}
      {questionsUrl.length == 0 && <QuestionsConfig setQuestionsUrl={setQuestionsUrl} cheatMode={cheatMode} setCheatMode={setCheatMode}/>}

      {/*if questionsUrl is more than 0 then it is set and we should have questions */}
      {questionsUrl.length > 0 &&
      <>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-baseline gap-2.5 bg-ink border border-chalk/10 rounded-lg px-4 py-2.5 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.3),0_2px_0_rgba(0,0,0,0.25)]">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-chalk-dim">Round</span>
            <span className="font-mono font-semibold text-xl text-gold [text-shadow:0_0_12px_rgba(242,183,5,0.35)] tabular-nums">
              {questions.length > 0 ? String(Math.min(questionIndex + 1, questions.length)).padStart(2, '0') : '00'}
              <span className="text-gold/45 font-medium px-0.5">/</span>
              {questions.length > 0 ? questions.length : '--'}
            </span>
          </div>
          <div className="font-display text-[13px] leading-[1.35] tracking-wide text-gold text-right [text-shadow:0_0_18px_rgba(242,183,5,0.35)]">
            Trivia<br />Night
          </div>
        </div>

        {/* show results only if we are finished */}
        {finished && <Results questions={questions} answers={answers} onPlayAgain={handlePlayAgain} />}

        {/* if we are not finished and still no question then we failed to fetch questions */}
        {!finished && questions.length === 0 &&
          <p className="font-body text-chalk-dim text-center py-8">Could not load questions. Please reload and try again.</p>
        }
        {!finished && questions.length > 0 &&
          <>
            <Question questions={questions} questionIndex={questionIndex} />
            <AnswerOptions questions={questions} questionIndex={questionIndex} userAnswers={answers} answerOptions={answerOptions} cheatMode={cheatMode}/>
          </>
        }
        <Move questionIndex={questionIndex} questions={questions} handleMove={handleMove} setFinished={setFinished} finished={finished} />
        </>
      }
    </>
  )
}

export default DisplayPanel