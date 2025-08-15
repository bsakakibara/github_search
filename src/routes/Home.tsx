import { useState } from 'react'
import Search from '../components/Search'
import type { TypesProps } from '../types/types'
import { loadUser } from '../services/api'
import DataUser from '../components/DataUser'
import Error from '../components/Error'

const Home = () => {
    const [user, setUser] = useState<TypesProps | null>(null)
    const [userName, setUserName] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false);

    const handleSearch = async () => {
        if (!userName.trim()) return
        setLoading(true)
        setError(false);

        const userData = await loadUser(userName)
        if (userData) {
            setUser(userData);
        } else {
            setUser(null);
            setError(true);
        }

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

            {error && <Error />}

            {user && <DataUser {...user} />}
        </div>
    )
}

export default Home