/// <reference types="vite/client" />
interface Category { 
    id: number,
    name: string
}
interface Question {
    incorrect_answers: string[],
    correct_answer: string,
    question: string,
}
interface Answer { 
    answered_correctly: boolean,
    user_answer: string
}

interface QuestionsConfigProps {
    setQuestionsUrl: (url: string) => void,
    setCheatMode: (toggle: boolean) => void,
    cheatMode: boolean,
}

interface MoveProps {
    finished: boolean,
    questionIndex: number,
    questions: Question[],
    handleMove: (step: number) => void,
    setFinished: (bool: boolean) => void
}

interface ResultsProps {
    answers: {
        current: Answer[]
    },
    questions: Question[],
}

interface QuestionProps {
    questionIndex: number,
    questions: Question[],
}

interface AnswerProps {
    questionIndex: number,
    questions: Question[],
    cheatMode: boolean,
    userAnswers: {
        current: Answer[]
    },
    answerOptions:  {
        current: string[][]
    }
}
