
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
  let answers = useRef<Answer[]>([]);


  // get questions
  // will make call again when questionsUrl changes
  useEffect(() => {
    fetch(questionsUrl)
      .then(response => response.json())
      .then(data => {
        if (data.response_code === 0) {
          setQuestions(data.results);
        } else {
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });

  }, [questionsUrl])
  // handles moving between questions and results
  const handleMove = (step: number) => {
    let newIndex = questionIndex + step;
    if (newIndex < questions.length && newIndex >= 0) {
      setFinished(false)
      setQuestionIndex(newIndex)
    } else {
      // this is here to log edge cases
      console.log('why are you here! index:' +  newIndex);
    }
  }
  return (
    <>
      {/*if questionsUrl is 0 then we need to get url with configuration */}
      {questionsUrl.length == 0 && <QuestionsConfig setQuestionsUrl={setQuestionsUrl} cheatMode={cheatMode} setCheatMode={setCheatMode}/>}

      {/*if questionsUrl is more than 0 then it is set and we should have questions */}
      {questionsUrl.length > 0 && 
      <>
        {/* show results only if we are finished */}
        {finished && <Results questions={questions} answers={answers} />}
        
        {/* if we are not finished and still no question then we failed to fetch questions */}
        {!finished && questions.length === 0 && 'Could not Load Qeustions! Please reload Again'}
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