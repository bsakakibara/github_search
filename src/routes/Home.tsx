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
        <div>
            <Search
                userName={userName}
                setUserName={setUserName}
                onSearch={handleSearch}
            />

            {loading && <p>Carregando...</p>}

            {error && <Error message="Usuário não encontrado" />}
            {!loading && repos.length === 0 && user && <Error message="Nenhum repositório encontrado" />}

            {user && <DataUser {...user} />}

            {repos.length > 0 && (
                <>
                    <div>
                        <label>Ordenar por:</label>
                        <select value={sortOptions} onChange={(e) => setSortOptions(e.target.value as any)}>
                            <option value="stars">Estrelas</option>
                            <option value="name">Nome</option>
                            <option value="updated">Atualizações</option>
                        </select>
                    </div>

                    <DataRepo repos={sortedRepos} />
                </>
            )}
        </div>
    )
}

export default Home