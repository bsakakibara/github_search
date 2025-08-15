type SearchProps = {
    userName: string
    setUserName: (name: string) => void
    onSearch: () => void
}

const Search = ({ userName, setUserName, onSearch }: SearchProps) => {
    return (
        <div>
            <div>Search</div>
            <div>
                <input
                    type="text"
                    placeholder='Digite o nome do usuário'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <button onClick={onSearch}>buscar</button>
            </div>
        </div>
    )
}

export default Search