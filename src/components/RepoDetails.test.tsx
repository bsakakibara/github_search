import { MemoryRouter, Route, Routes } from "react-router-dom";
import RepoDetails from "./RepoDetails";
import { render, screen, waitFor } from "@testing-library/react";

const mockRepo = {
    name: "repo-teste",
    description: "Repositório de teste",
    stargazers_count: 42,
    language: "TypeScript",
    html_url: "https://github.com/user/repo-teste",
    owner: { login: "bsakakibara" }
};

describe("RepoDetails Component", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("renderiza dados do repositório", async () => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            ok: true,
            json: async () => mockRepo
        } as any);

        render(
            <MemoryRouter initialEntries={["/repo/bsakakibara/repo-teste"]}>
                <Routes>
                    <Route path="/repo/:owner/:repoName" element={<RepoDetails />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/Carregando/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText("repo-teste")).toBeInTheDocument();
            expect(screen.getByText("Repositório de teste")).toBeInTheDocument();
            expect(screen.getByText(/Estrelas: 42/i)).toBeInTheDocument();
            expect(screen.getByText(/linguagem: TypeScript/i)).toBeInTheDocument();
        });
    });

    test("mensagem de erro se a API falhar", async () => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            ok: false
        } as any);

        render(
            <MemoryRouter initialEntries={["/repo/bsakakibara/repo-teste"]}>
                <Routes>
                    <Route path="/repo/:owner/:repoName" element={<RepoDetails />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/Carregando/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/Repositório não encontrado/i)).toBeInTheDocument();
        })
    })

    test("mensagem de erro se não tiver repositório", async () => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            ok: true,
            json: async () => null
        } as any);

        render(
            <MemoryRouter initialEntries={["/repo/bsakakibara/repo-teste"]}>
                <Routes>
                    <Route path="/repo/:owner/:repoName" element={<RepoDetails />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Repositório não encontrado/i)).toBeInTheDocument();
        })
    })

})