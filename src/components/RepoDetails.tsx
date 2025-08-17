import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { RepoProps } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { faClock, faCode } from "@fortawesome/free-solid-svg-icons"

const RepoDetails = () => {
    const { owner, repoName } = useParams<{ owner: string; repoName: string }>();
    const [repo, setRepo] = useState<RepoProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchRepo = async () => {
            try {
                const res = await fetch(`https://api.github.com/repos/${owner}/${repoName}`);
                if (!res.ok) throw new Error("Repositório não encontrado");
                const data = await res.json();
                setRepo(data);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchRepo();
    }, [owner, repoName]);

    if (loading) return <p className="text-primary text-lg font-medium animate-pulse mt-4">Carregando...</p>;
    if (error || !repo) return <p className="text-red-500 mt-4">Repositório não encontrado</p>;

    return (
        <div className="w-full max-w-3xl p-6 rounded-2xl bg-white/10 dark:bg-black/20 
        backdrop-blur-md shadow-lg border border-white/20 mt-6">

            <h2 className="text-2xl font-bold text-primary mb-2">{repo.name}</h2>

            {repo.description && <p className="text-foreground/80 mb-4">{repo.description}</p>}

            <div className="flex flex-wrap gap-4 text-sm text-foreground/60 mb-4">
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

                <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 font-medium"
                >
                    Visualizar no GitHub
                </a>
            </div>
        </div>
    )
}

export default RepoDetails