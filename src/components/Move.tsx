import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/16/solid';

function Move({questionIndex, questions, handleMove, finished, setFinished}: MoveProps) {
  return (
    <>
    {questionIndex-1 >= 0  && 
        <div className='mt-5 float-left h-10 w-10 text-white hover:text-sky-900'>
          <ArrowLeftCircleIcon onClick={() => handleMove(-1)} />
        </div>      
    }
    {questionIndex+1 < questions.length &&
        <div className='mt-5 float-right h-10 w-10 text-white hover:text-sky-900'>
          <ArrowRightCircleIcon onClick={() => handleMove(1)} />
        </div>
    }
    {!finished && questionIndex+1 === questions.length &&
        <div className='mt-5 float-right text-white hover:text-sky-900'>
        <button type="button" className="focus:outline-none text-white bg-green-700 
                                        hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg 
                                        text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" 
                                        
                onClick={() => setFinished(true)}>Submit</button>
        </div>
    }
    </>
  )
}

export default Move