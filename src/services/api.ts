import type { TypesProps } from "../types/types";

export const loadUser = async (userName: string) => {
    try {
        const res = await fetch(`https://api.github.com/users/${userName}`);
        if (res.status === 404) {
            return null;
        }
        const data = await res.json();

        const { login, location, avatar_url, followers, following } = data

        const userData: TypesProps = {
            login,
            location,
            avatar_url,
            followers,
            following
        }

        return userData;
    } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        return null;
    }
} 