import type { TypesProps } from "../types/types"


const DataUser = ({
    login,
    location,
    avatar_url,
    followers,
    following,
    email,
    bio
}: TypesProps) => {
    return (
        <div>
            <img src={avatar_url} alt={login} />
            <h3>{login}</h3>
            {location && <p>Localização: {location}</p>}
            {email && <p>Email: {email}</p>}
            {bio && <p>Bio: {bio}</p>}
            <p>Seguidores: {followers}</p>
            <p>Seguindo: {following}</p>
        </div>
    )
}

export default DataUser