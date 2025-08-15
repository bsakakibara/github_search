import { Link } from "react-router-dom";
import type { RepoProps } from "../types/types"

type RepoListProps = {
    repos: RepoProps[];
}

const DataRepo = ({ repos }: RepoListProps) => {
    if (repos.length === 0)
        return <p>Usuário nao possui repositórios públicos</p>

    return (
        <div>
            <ul>
                {repos.map((repo) => (
                    <li key={repo.id}>
                        <Link to={`/repo/${repo.owner.login}/${repo.name}`}>
                        {repo.name}
                        </Link>

                        <p>{repo.description}</p>
                        <p>{repo.stargazers_count} | {repo.language} | Atualizado em {new Date(repo.updated_at).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DataRepo