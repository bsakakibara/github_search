export type TypesProps = {
    login: string;
    location?: string | null;
    avatar_url: string;
    followers: number;
    following: number;
    email?: string | null;
    bio?: string | null;
};

export type RepoProps = {
    id: number;
    name: string;
    description: string | null;
    stargazers_count: number;
    language: string | null;
    html_url: string;
    updated_at: string;
    owner: { login: string};

}