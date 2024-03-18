import DisplayPanel from './components/DisplayPanel';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <div className='items-center justify-center'>
        <div className='flex w-full flex-col items-center justify-center'>
          <div className="w-full px-4 py-16">
            <div className="mx-auto w-full max-w-md">
              <DisplayPanel />
              <Routes>
              <Route path="/quiz" element={<App />} />
            </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
