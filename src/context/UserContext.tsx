import { createContext, useState, type ReactNode } from "react";
import type { TypesProps, RepoProps } from "../types/types";

type UserContextType = {
    user: TypesProps | null;
    setUser: (user: TypesProps | null) => void;
    repos: RepoProps[];
    setRepos: (repos: RepoProps[]) => void;
};

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => { },
    repos: [],
    setRepos: () => { }
})

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<TypesProps | null>(null);
    const [repos, setRepos] = useState<RepoProps[]>([]);

    return (
        <UserContext.Provider value={{ user, setUser, repos, setRepos }}>
            {children}
        </UserContext.Provider>

    );
};

export default UserContext