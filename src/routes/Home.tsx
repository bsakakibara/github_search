import { useContext, useState } from 'react'
import Search from '../components/Search'
import { loadRepos, loadUser } from '../services/api'
import DataUser from '../components/DataUser'
import Error from '../components/Error'
import DataRepo from '../components/DataRepo'
import UserContext from '../context/UserContext'

const Home = () => {
    const { user, setUser, repos, setRepos } = useContext(UserContext);
    const [userName, setUserName] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const [sortOptions, setSortOptions] = useState<'stars' | 'name' | 'updated'>('stars')

    const sortedRepos = [...repos].sort((a, b) => {
        if (sortOptions === 'stars') return b.stargazers_count - a.stargazers_count;
        if (sortOptions === 'name') return a.name.localeCompare(b.name);
        if (sortOptions === 'updated') return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        return 0;
    })
    const handleSearch = async () => {
        if (!userName.trim()) return
        setLoading(true)
        setError(false);

        const userData = await loadUser(userName)
        if (!userData) {
            setUser(null)
            setRepos([])
            setError(true)
            setLoading(false)
            return
        }

        const userRepos = await loadRepos(userName)
        setUser(userData)
        setRepos(userRepos || [])
        setLoading(false)
    }

    return (
        <div className="w-full flex flex-col items-center gap-6 mt-8">
            <Search
                userName={userName}
                setUserName={setUserName}
                onSearch={handleSearch}
            />

            {loading && <p className='text-primary text-lg font-medium animate-pulse'>Carregando...</p>}

            {error && <Error message="Usuário não encontrado" />}
            {!loading && repos.length === 0 && user && <Error message="Nenhum repositório encontrado" />}

            {user && (
                <div className='w-full max-w-3xl p-6 rounded-2xl bg-white/10 
                dark:bg-black/20 backdrop-blur-md shadow-lg border border-white/20'>
                    <DataUser {...user} />
                </div>
            )}

            {repos.length > 0 && (
                <>
                    <div className='w-full max-w-4xl flex flex-col gap-4 mt-2'>

                        <div className='flex items-center justify-end gap-2 w-full max-w-4xl overflow-visible'>
                            <label htmlFor='sort' className='font-medium text-foreground/80'>
                                Ordenar por:
                            </label>
                            <div className='relative'>
                                <select
                                    id='sort'
                                    value={sortOptions}
                                    onChange={(e) => setSortOptions(e.target.value as any)}
                                    className='appearance-none px-4 py-2 pr-10 bg-background/80 border border-border
                                    text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition shadow-sm z-10'
                                >
                                    <option value="stars">Estrelas</option>
                                    <option value="name">Nome</option>
                                    <option value="updated">Atualizações</option>
                                </select>
                                {/* Seta personalizada */}
                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                    <svg
                                        className="w-4 h-4 text-foreground/60"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DataRepo repos={sortedRepos} />
                </>
            )}
        </div>
    )
}

export default Home