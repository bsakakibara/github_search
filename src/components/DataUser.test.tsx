import { render, screen } from "@testing-library/react"
import type { TypesProps } from "../types/types"
import DataUser from "./DataUser"

describe("DataUser Component", () => {
    const mockUser: TypesProps = {
        login: "bsakakibara",
        location: "São Paulo",
        avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
        followers: 20,
        following: 12,
        email: "bruno.sakakibara@gmail.com",
        bio: "Desenvolvedor"
    }

    test("Renderiza os dados obrigatórios", () => {
        render(<DataUser {...mockUser} />)

        expect(screen.getByRole("img")).toHaveAttribute("src", mockUser.avatar_url);
        expect(screen.getByRole("img")).toHaveAttribute("alt", mockUser.login);

        expect(screen.getByText(new RegExp(mockUser.location!, "i"))).toBeInTheDocument();
        expect(screen.getByText(new RegExp(mockUser.email!, "i"))).toBeInTheDocument();

        expect(screen.getByText(`Bio: ${mockUser.bio}`)).toBeInTheDocument();
    });

    test("Não renderiza dados opcionais quando não é fornecido", () => {
        const partialUser: TypesProps = {
            login: "test321",
            avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
            followers: 8,
            following: 3,
            location: undefined,
            email: undefined,
            bio: undefined
        }

        render(<DataUser {...partialUser} />);

        expect(screen.queryByText(/São Paulo/i)).toBeNull();
        expect(screen.queryByText(/bruno.sakakibara@gmail.com/i)).toBeNull();

        expect(screen.queryByText(/Bio:/i)).toBeNull();
    })
})