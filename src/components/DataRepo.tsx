import { Link } from "react-router-dom";
import type { RepoProps } from "../types/types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { faClock, faCode } from "@fortawesome/free-solid-svg-icons"

type RepoListProps = {
    repos: RepoProps[];
}

const DataRepo = ({ repos }: RepoListProps) => {
    if (repos.length === 0)
        return <p className="text-foreground/70 mt-4">Usuário nao possui repositórios públicos</p>

    return (
        <div className="w-full max-w-4xl flex flex-col gap-4 mt-4">
            <ul className="flex flex-col gap-3">
                {repos.map((repo) => (
                    <Link
                        key={repo.id}
                        to={`/repo/${repo.owner.login}/${repo.name}`}
                        className="block p-4 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-md 
                        border border-white/20 hover:shadow-lg hover:scale-105 transition-transform duration-200"
                    >
                        <h3 className="text-lg font-semibold text-primary hover:underline">{repo.name}</h3>
                        {repo.description && (
                            <p className="text-foreground/70 mt-1 line-clamp-2">{repo.description}</p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-foreground/60 mt-2">
                            <span className="flex items-center gap-1">
                                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                                {repo.stargazers_count}
                            </span>
                            {repo.language &&
                                <span className="flex items-center gap-1">
                                    <FontAwesomeIcon icon={faCode} className="text-green-400" />
                                    {repo.language}
                                </span>}
                            <span className="flex items-center gap-1">
                                <FontAwesomeIcon icon={faClock} className="text-blue-400" />
                                Atualizado: {new Date(repo.updated_at).toLocaleDateString()}
                            </span>
                        </div>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default DataRepo