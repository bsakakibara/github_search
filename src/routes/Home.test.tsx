import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UserProvider } from "../context/UserContext";
import Home from "./Home";
import * as api from "../services/api";
import { MemoryRouter } from "react-router-dom";

const mockUser = {
    login: "bsakakibara",
    location: "Brazil",
    avatar_url: "avatar.png",
    followers: 10,
    following: 5,
    email: "bruno@example.com",
    bio: "Dev"
}

const mockRepos = [
    {
        id: 1,
        name: "repo-b",
        description: "Repositório B",
        stargazers_count: 5,
        language: "TypeScript",
        updated_at: "2025-02-10",
        html_url: "url-b",
        owner: { login: "bsakakibara" }
    },
    {
        id: 2,
        name: "repo-a",
        description: "Repositório A",
        stargazers_count: 15,
        language: "TypeScript",
        updated_at: "2025-0-20",
        html_url: "url-a",
        owner: { login: "bsakakibara" }
    },
]

describe("Home Component", () => {
    beforeEach(() => {
        jest.spyOn(api, "loadUser").mockResolvedValue(mockUser);
        jest.spyOn(api, "loadRepos").mockResolvedValue(mockRepos);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("renderiza search e estados iniciais", () => {
        render(
            <UserProvider>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </UserProvider>
        );
        // input do serach
        expect(screen.getByRole("textbox")).toBeInTheDocument();
        expect(screen.queryByText(/Carregando/i)).not.toBeInTheDocument();
    });

    test("exibe dados do usuário e repositórios após pesquisa", async () => {
        render(
            <UserProvider>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </UserProvider>
        );

        fireEvent.change(screen.getByRole("textbox"), { target: { value: "bsakakibara" } });
        fireEvent.click(screen.getByRole("button", { name: /buscar/i }));

        expect(screen.getByText(/Carregando/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText("bsakakibara")).toBeInTheDocument();
            expect(screen.getByText(/Dev/)).toBeInTheDocument();
            expect(screen.getByText(/repo-a/)).toBeInTheDocument();
            expect(screen.getByText(/repo-b/)).toBeInTheDocument();
        });
    });

    test("exibe erro se não encrontrar o usuário", async () => {
        jest.spyOn(api, "loadUser").mockResolvedValue(null);
        render(
            <UserProvider>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </UserProvider>
        );

        fireEvent.change(screen.getByRole("textbox"), { target: { value: "não existe" } });
        fireEvent.click(screen.getByRole("button", { name: /buscar/i }));

        await waitFor(() => {
            expect(screen.getByText(/Usuário não encontrado/i)).toBeInTheDocument();
        });
    });

    test("exibe erro se não encrontrar o repositório do usuário", async () => {
        jest.spyOn(api, "loadRepos").mockResolvedValue([]);
        render(
            <UserProvider>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </UserProvider>
        );

        fireEvent.change(screen.getByRole("textbox"), { target: { value: "bsakakibara" } });
        fireEvent.click(screen.getByRole("button", { name: /buscar/i }));

        await waitFor(() => {
            expect(screen.getByText(/Nenhum repositório encontrado/i)).toBeInTheDocument();
        });
    });

    test("altera ordem dos repositórios quando muda o sortOptions", async () => {
        render(
            <UserProvider>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </UserProvider>
        );

        fireEvent.change(screen.getByRole("textbox"), { target: { value: "bsakakibara" } });
        fireEvent.click(screen.getByRole("button", { name: /buscar/i }));

        expect(screen.getByText(/Carregando/i)).toBeInTheDocument();

        await waitFor(() => {
            const options = screen.getByLabelText(/Ordenar por/i);
            fireEvent.change(options, { target: { value: "name" } });
            const repoElements = screen.getAllByText(/repo-/i);
            expect(repoElements[0]).toHaveTextContent("repo-a");
            expect(repoElements[1]).toHaveTextContent("repo-b");
        });
    });


});