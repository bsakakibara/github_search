import type { TypesProps } from "../types/types"


const DataUser = ({
    login,
    location,
    avatar_url,
    followers,
    following,
}: TypesProps) => {
    return (
        <div>DataUser
            <img src={avatar_url} alt={login} />
            <h3>{login}</h3>
            <p>{location}</p>
            <p>Seguidores: {followers}</p>
            <p>Seguindo: {following}</p>
        </div>
    )
}

export default DataUser