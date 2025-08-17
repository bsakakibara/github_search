import { MemoryRouter, Route, Routes } from "react-router-dom";
import RepoDetails from "./RepoDetails";
import { render, screen, waitFor } from "@testing-library/react";

const mockRepo = {
    name: "repo-teste",
    description: "Repositório de teste",
    stargazers_count: 42,
    language: "TypeScript",
    html_url: "https://github.com/user/repo-teste",
    owner: { login: "bsakakibara" },
    updated_at: "2025-12-27T11:00:00Z"
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
            expect(screen.getByText("42")).toBeInTheDocument();
            expect(screen.getByText("TypeScript")).toBeInTheDocument();
            // Verifica data formatada
            const formattedDate = new Date(mockRepo.updated_at).toLocaleDateString();
            expect(screen.getByText(`Atualizado: ${formattedDate}`)).toBeInTheDocument();

            // Link externo
            expect(screen.getByRole("link", { name: /Visualizar no GitHub/i })).toHaveAttribute(
                "href",
                mockRepo.html_url
            );
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