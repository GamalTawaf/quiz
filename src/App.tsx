import DisplayPanel from './components/DisplayPanel';

function App() {
  return (
    <div className="w-full max-w-[640px] flex flex-col gap-[22px]">
      <DisplayPanel />
      <footer className="text-center text-sm opacity-70">
        <a href="https://github.com/GamalTawaf/quiz" target="_blank" rel="noreferrer">
          View source on GitHub
        </a>
      </footer>
    </div>
  )
}

export default App
