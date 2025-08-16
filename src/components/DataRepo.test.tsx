import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { RepoProps } from "../types/types"
import DataRepo from "./DataRepo";

describe("DataRepo Component", () => {
    const mockRepos: RepoProps[] = [
        {
            id: 1,
            name: "repositorio-teste",
            description: "Teste de Repositório",
            stargazers_count: 30,
            language: "Teste Linguagem",
            html_url: "https://github.com/user/repositorio-teste",
            updated_at: "2022-11-16T10:00:00Z",
            owner: { login: "bsakakibara" }
        },
        {
            id: 2,
            name: "repo-test",
            description: "Test Repo",
            stargazers_count: 10,
            language: "Linguage Test",
            html_url: "https://github.com/user/repo-test",
            updated_at: "2025-12-27T11:00:00Z",
            owner: { login: "bsakakibara" }
        }
    ];

    test("Renderiza mensagem se não tem repositórios", () => {
        render(
            <MemoryRouter>
                <DataRepo repos={[]} />
            </MemoryRouter>
        )

        expect(
            screen.getByText("Usuário nao possui repositórios públicos")
        ).toBeInTheDocument();

    });


    test("Renderiza mensagem com dados corretos", () => {
        render(
            <MemoryRouter>
                <DataRepo repos={mockRepos} />
            </MemoryRouter>
        );

        expect(screen.getByRole("link", { name: /repositorio-teste/i })).toHaveAttribute(
            "href",
            "/repo/bsakakibara/repositorio-teste"
        );

        expect(screen.getByRole("link", { name: /repo-test/i })).toHaveAttribute(
            "href",
            "/repo/bsakakibara/repo-test"
        );

        expect(screen.getByText("Teste de Repositório")).toBeInTheDocument();

        expect(screen.queryByText("null")).toBeNull();

        // Verifica os detalhes do repositório usando função para ignorar quebras
        expect(
            screen.getByText((content) =>
                content.includes("30") &&
                content.includes("Teste Linguagem") &&
                content.includes("Atualizado em")
            )
        ).toBeInTheDocument();

        expect(
            screen.getByText((content) =>
                content.includes("10") &&
                content.includes("Linguage Test") &&
                content.includes("Atualizado em")
            )
        ).toBeInTheDocument();
    });
});
