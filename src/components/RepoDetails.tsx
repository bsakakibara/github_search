import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { RepoProps } from "../types/types";

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

    if (loading) return <p>Carregando...</p>;
    if (error || !repo) return <p>Repositório não encontrado</p>;

    return (
        <div>
            <h2>{repo.name}</h2>
            {repo.description && <p>{repo.description}</p>}
            <p>Estrelas: {repo.stargazers_count}</p>
            {repo.language && <p>Linguagem: {repo.language}</p>}
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">Visualizar no GitHub</a>
        </div>
    )
}

export default RepoDetails