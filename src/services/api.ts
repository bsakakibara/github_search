import type { RepoProps, TypesProps } from "../types/types";

export const loadUser = async (userName: string): Promise<TypesProps | null> => {
    try {
        const res = await fetch(`https://api.github.com/users/${userName}`);
        if (res.status === 404) {
            return null;
        }
        const data = await res.json();

        const userData: TypesProps = {
            login: data.login,
            location: data.location,
            avatar_url: data.avatar_url,
            followers: data.followers,
            following: data.following,
            email: data.email,
            bio: data.bio
        };

        return userData;
    } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        return null;
    }
}

export const loadRepos = async (userName: string): Promise<RepoProps[] | null> => {
    try {
        const res = await fetch(`https://api.github.com/users/${userName}/repos?per_page=100`)
        if (res.status === 404) {
            return null;
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Erro ao carregar os repositórios:', error);
        return null;
    }
}