import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import ThemeToggle from '../ThemeToggle'

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center px-4">
      <header className="w-full max-w-4xl py-6 flex items-center justify-between">
        {/* Só exibe o botão de voltar se não estiver na home */}
        {location.pathname !== "/" && (
          <button
            onClick={() => navigate(-1)}
            className="px-3 sm:px-4 py-2 rounded-xl bg-primary text-white font-medium
                       shadow-md hover:bg-primary/90 transition text-sm sm:text-base
                       flex items-center gap-2"
          >
            {/* Mobile só ícone */}
            <span className="block sm:hidden">
              <FontAwesomeIcon icon={faArrowLeft} />
            </span>
            {/* Desktop com texto */}
             <FontAwesomeIcon icon={faArrowLeft} size="sm" className="text-lg" />
            <span className="hidden sm:inline">Voltar</span>
          </button>
        )}

        <div className='text-2xl sm:text3xl font-bold bg-gradient-to-r text-primary text-center flex-1'>
          <h1 className="text-3xl font-bold bg-gradient-to-r text-primary">GitHub Search</h1>
        </div>

        {/* Botão para dark/light */}
        <ThemeToggle />
        {/* Espaço vazio para manter o título centralizado */}
        {location.pathname !== "/" && <div className="w-[85px] sm:w-[100px]" />}

      </header>
      <main className="w-full max-w-4xl flex-1 flex flex-col items-center justify-start">
        <Outlet />
      </main>
    </div>
  )
}

export default App
