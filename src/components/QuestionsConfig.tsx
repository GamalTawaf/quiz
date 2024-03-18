import { SyntheticEvent, useEffect, useState } from 'react';
import ohCommon from '../assets/oh_comon.gif';
import why from '../assets/why.gif';
import why2 from '../assets/why_2.gif';
import win from '../assets/win.gif';
import cheat from '../assets/cheat.gif';
const images = [ohCommon, why, why2, win, cheat];
const difficulties = [
  { name: 'Any'  },
  { name: 'Easy'  },
  { name: 'Medium' },
  { name: 'Hard' },
]

const questionTypes = [
    { name: 'Any', value: 'any' },
    { name: 'Multipe Choices', value:'multiple' },
    { name: 'True / False', value:'boolean' },
  ]

const url = 'https://opentdb.com/api_category.php';

export default function QuestionsConfig({setQuestionsUrl, setCheatMode, cheatMode}: QuestionsConfigProps) {
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(10);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(difficulties[0].name)
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>(questionTypes[0].value)
  const [categories, setCategories] = useState<Category[]>([]);
  // fetch all possible categories
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
          setCategories(data.trivia_categories);
          setSelectedCategory(data.trivia_categories[0].id)
      })
      .catch((err) => {
        console.log(err.message);
      });

  }, [])
  
  const handleCategoryChange = (event: SyntheticEvent) => {
    let tempTarget: any = event.target;
    setSelectedCategory(tempTarget.value);
  }

  const handleDiffucultyChange = (event: SyntheticEvent) => {
    let tempTarget: any = event.target;
    setSelectedDifficulty(tempTarget.value);
  }

  const handleQuestionTypeChange = (event: SyntheticEvent) => {
    let tempTarget: any = event.target;
    setSelectedQuestionType(tempTarget.value);
  }
  const handleNumberOfQuestionsChange = (event: SyntheticEvent) => {
    let tempTarget: any = event.target;
    setNumberOfQuestions(tempTarget.value);
  }

  const handleCheatModeChange = (event: SyntheticEvent) => {
    let tempTarget: any = event.target;
    setCheatMode(tempTarget.checked);
  }
  
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    let url = 'https://opentdb.com/api.php?encode=url3986'
    if(numberOfQuestions > 0) {
      url += '&amount=' + numberOfQuestions;
    }
    if(selectedCategory != 'any') {
      url += '&category=' + selectedCategory;
    }
    if(selectedDifficulty != 'Any') {
      url += '&difficulty=' + selectedDifficulty;
    }
    if(selectedQuestionType != 'any') {
      url += '&type=' + selectedQuestionType;
    }
    // sets the url to be called to get questions
    setQuestionsUrl(url);

  }
  const [selectedCategory, setSelectedCategory] = useState('')
  return (
    <>
    <form className='bg-white p-10 rounded-lg'>
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Questions Config</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Choose the quiz configuration to start
        </p>
  
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-5">
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              Number Of questions
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="number"
                  name="questionsCount"
                  key="questionsCount"
                  value={numberOfQuestions}
                  onChange={handleNumberOfQuestionsChange}
                  autoComplete="questionsCount"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="10"
                />
              </div>
            </div>
          </div>
          
          <div className="sm:col-span-5">
            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
              Category
            </label>
            <div className="mt-2">
              <select
                key="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                autoComplete="country-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                {categories.map((category) => (
                  <option key={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="sm:col-span-5">
            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
              Category
            </label>
            <div className="mt-2">
              <select
                name="difficulty"
                key="difficulty"
                value={selectedDifficulty}
                onChange={handleDiffucultyChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty.name}>{difficulty.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="sm:col-span-5">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Question Types</legend>
              <div className="mt-6 space-y-6">
              {questionTypes.map((questionType) => (
                <div className="flex items-center gap-x-3" key={questionType.name}>
                  <input
                    name="difficulty"
                    value={questionType.value}
                    checked={selectedQuestionType === questionType.value}
                    onChange={handleQuestionTypeChange}
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="difficulty" className="block text-sm font-medium leading-6 text-gray-900">
                    {questionType.name}
                  </label>
                </div>
              ))}
              </div>
            </fieldset>
          </div>

          <div className="sm:col-span-5">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Cheat Mode</legend>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3" key="cheat">
                  <input
                    name="cheatMode"
                    checked={cheatMode === true}
                    onChange={handleCheatModeChange}
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="difficulty" className="block text-sm font-medium leading-6 text-gray-900">
                    so Lazy today &#128540; Just show correct answer! &#128520;
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
          
          {cheatMode &&
            <div className="sm:col-span-5">
             <img src={images[Math.floor(Math.random() * 5)]} /> 
            </div>
          }
        </div>
      </div>
      </div>
  
    <div className="mt-6 flex items-center justify-end gap-x-6">
      {cheatMode &&
        <span className='font-black'> 
          &#128590;&#128584;&#128585;&#x1F64A;
        </span>
      }
      <button
        type="submit"
        onClick={handleSubmit}
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Save
      </button>
    </div>
  </form>
    </>
  )
}
