import { render, screen } from '@testing-library/react';
import Error from './Error';

describe("Error Component", () => {
    test("renderização da mensagem feita via props", () => {
        render(<Error message="Usuário não encontrado" />);

        const messageElement = screen.getByText("Usuário não encontrado");

        expect(messageElement).toBeInTheDocument();
    });

    test("Renderiza a mensagem padrão quena não é passada por props", () => {
        render(<Error />)

        const defaultMessage = screen.getByText("Ocorreu um erro");

        expect(defaultMessage).toBeInTheDocument();
    })
})