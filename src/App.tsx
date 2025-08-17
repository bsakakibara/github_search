import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import ThemeToggle from '../ThemeToggle'

function App() {
  const navigate = useNavigate();
  const location = useLocation();
   const isHome = location.pathname === "/"

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center px-4">
      <header className="w-full max-w-4xl py-4 flex items-center justify-between">

        <div className="w-10 flex items-center justify-start">
          {!isHome ? (
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl bg-primary text-white shadow-md hover:bg-primary/90 transition"
              aria-label="Voltar"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          ) : (
            <div className="w-6" /> 
          )}
        </div>

        {/* título */}
        <h1 className="text-xl sm:text-3xl font-bold text-primary text-center flex-1">
          GitHub Search
        </h1>

        {/* toggle */}
        <div className="w-10 flex items-center justify-end">
          <ThemeToggle />
        </div>
      </header>
      <main className="w-full max-w-4xl flex-1 flex flex-col items-center justify-start">
        <Outlet />
      </main>
    </div>
  )
}

export default App
