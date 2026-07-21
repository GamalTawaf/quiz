import { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import Board from './Board';
import PillButton from './PillButton';

const cheatGifLoaders = [
  () => import('../assets/oh_comon.gif'),
  () => import('../assets/why.gif'),
  () => import('../assets/why_2.gif'),
  () => import('../assets/win.gif'),
  () => import('../assets/cheat.gif'),
];

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

const fieldClass = "block w-full rounded-lg border-0 bg-chalk text-ink py-2 px-3 shadow-paddle focus:outline-none focus:ring-2 focus:ring-gold sm:text-sm";

export default function QuestionsConfig({setQuestionsUrl, setCheatMode, cheatMode}: QuestionsConfigProps) {
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(10);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(difficulties[0].name)
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>(questionTypes[0].value)
  const [selectedCategory, setSelectedCategory] = useState('any')
  const [categories, setCategories] = useState<Category[]>([]);
  const [cheatImages, setCheatImages] = useState<string[] | null>(null);
  // fetch all possible categories
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
          setCategories(data.trivia_categories);
      })
      .catch(() => {
        setCategories([]);
      });

  }, [])

  // only fetch the (large) cheat-mode gifs once the user actually turns cheat mode on
  useEffect(() => {
    if (!cheatMode || cheatImages) return;
    Promise.all(cheatGifLoaders.map(load => load())).then((mods) => {
      setCheatImages(mods.map((mod) => mod.default));
    });
  }, [cheatMode, cheatImages])

  // pick once per cheat-mode toggle-on, not on every unrelated re-render
  const cheatImage = useMemo(
    () => cheatImages ? cheatImages[Math.floor(Math.random() * cheatImages.length)] : null,
    [cheatImages]
  );

  const handleCategoryChange = (event: SyntheticEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.currentTarget.value);
  }

  const handleDiffucultyChange = (event: SyntheticEvent<HTMLSelectElement>) => {
    setSelectedDifficulty(event.currentTarget.value);
  }

  const handleQuestionTypeChange = (event: SyntheticEvent<HTMLInputElement>) => {
    setSelectedQuestionType(event.currentTarget.value);
  }
  const handleNumberOfQuestionsChange = (event: SyntheticEvent<HTMLInputElement>) => {
    setNumberOfQuestions(Number(event.currentTarget.value));
  }

  const handleCheatModeChange = () => {
    setCheatMode(!cheatMode);
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
  return (
    <Board className="pt-8 pb-[26px]">
      <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-chalk-dim mb-1.5">
        Set Up The Round
      </p>
      <h1 className="font-display text-2xl text-gold [text-shadow:0_0_18px_rgba(242,183,5,0.35)] mb-7">
        Trivia Night
      </h1>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="questionsCount" className="block font-mono text-[11px] tracking-[0.1em] uppercase text-chalk-dim mb-2">
            Number of questions
          </label>
          <input
            id="questionsCount"
            type="number"
            name="questionsCount"
            value={numberOfQuestions}
            onChange={handleNumberOfQuestionsChange}
            autoComplete="off"
            min={1}
            className={fieldClass}
            placeholder="10"
          />
        </div>

        <div>
          <label htmlFor="category" className="block font-mono text-[11px] tracking-[0.1em] uppercase text-chalk-dim mb-2">
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className={fieldClass}
          >
            <option value="any">Any</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="difficulty" className="block font-mono text-[11px] tracking-[0.1em] uppercase text-chalk-dim mb-2">
            Difficulty
          </label>
          <select
            id="difficulty"
            name="difficulty"
            value={selectedDifficulty}
            onChange={handleDiffucultyChange}
            className={fieldClass}
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty.name} value={difficulty.name}>{difficulty.name}</option>
            ))}
          </select>
        </div>

        <fieldset>
          <legend className="font-mono text-[11px] tracking-[0.1em] uppercase text-chalk-dim mb-3">Question Types</legend>
          <div className="flex flex-col gap-3">
            {questionTypes.map((questionType) => {
              const inputId = `question-type-${questionType.value}`;
              return (
                <label htmlFor={inputId} key={questionType.name} className="flex items-center gap-3 cursor-pointer">
                  <input
                    id={inputId}
                    name="questionType"
                    value={questionType.value}
                    checked={selectedQuestionType === questionType.value}
                    onChange={handleQuestionTypeChange}
                    type="radio"
                    className="h-4 w-4 accent-gold"
                  />
                  <span className="font-body text-sm text-chalk">
                    {questionType.name}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <label htmlFor="cheatModeToggle" className="flex items-center justify-between gap-4 pt-1 cursor-pointer">
          <div>
            <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-chalk-dim mb-1">Cheat Mode</p>
            <p className="font-body text-sm text-chalk-dim">Stamp the correct answer on every question</p>
          </div>
          <button
            id="cheatModeToggle"
            type="button"
            role="switch"
            aria-checked={cheatMode}
            aria-label="Toggle cheat mode"
            onClick={handleCheatModeChange}
            className={`relative w-[62px] h-[62px] shrink-0 rounded-full border-none cursor-pointer flex items-center justify-center transition-transform
              ${cheatMode
                ? 'bg-[radial-gradient(circle_at_35%_28%,#ff6a5f,#e1483f_55%,#a92f28_100%)] shadow-[0_0_0_4px_theme(colors.ink),0_0_0_5px_rgba(244,239,225,0.14),0_5px_0_theme(colors.buzzer.deep),0_8px_18px_rgba(225,72,63,0.45)] -translate-y-0.5'
                : 'bg-chalk/10 shadow-[0_0_0_4px_theme(colors.ink),0_0_0_5px_rgba(244,239,225,0.14)]'
              }`}
          >
            <span className="font-display text-[10px] text-chalk">
              {cheatMode ? 'On' : 'Off'}
            </span>
          </button>
        </label>

        {cheatMode && cheatImage &&
          <div className="rounded-xl overflow-hidden">
            <img src={cheatImage} alt="" className="w-full" />
          </div>
        }

        <PillButton type="submit" className="self-end">
          Start Quiz
        </PillButton>
      </form>
    </Board>
  )
}
