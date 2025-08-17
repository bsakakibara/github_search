import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from '@fortawesome/free-solid-svg-icons'

type SearchProps = {
    userName: string
    setUserName: (name: string) => void
    onSearch: () => void
}

const Search = ({ userName, setUserName, onSearch }: SearchProps) => {
    const handleSubmit = (e: React.FormEvent) => {
         e.preventDefault()
        onSearch()
    }

    return (
        <div className="w-full max-w-2xl fles flex-col items-center gap-6 mt-0 p-8 rounded-2xl
        bg-white/10 dark:bg-black/20 background-blur-md shadow-xl border-white/20"
        >
            <h2 className="text-2xl font-semibold text-primary text-center mb-2">Pesquisar Usuário:</h2>
            <p className="text-sm text-muted-foreground text-center mb-2">Digite o nome de usuário do GitHub que deseja acessar</p>

            <form onSubmit={handleSubmit} className="flex w-full gap-3">
                <div className="flex w-full gap-3">
                    <input
                        type="text"
                        placeholder='Digite o nome do usuário'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="flex-1 rounded-xl px-4 py-3 bg-background/80 border border-border
                    text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 
                    focus:ring-primary/50 transition-all duration-300 shadow-sm"
                    />
                    <button
                        onClick={onSearch}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary 
                     text-white font-medium shadow-md hover:shadow-lg
                     hover:opacity-90 active:scale-95
                     transition-all duration-200"
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Search