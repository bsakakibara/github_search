import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';

describe('Search Component', () => {
    test('renderiza o input e botão', () => {
        render(<Search userName="" setUserName={() => { }} onSearch={() => { }} />);

        const input = screen.getByPlaceholderText(/digite o nome do usuário/i);
        const button = screen.getByRole('button', { name: /buscar/i });

        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    test('chama setUserName ao digitar', () => {
        const mockSetUserName = jest.fn();
        render(<Search userName="" setUserName={mockSetUserName} onSearch={() => { }} />);

        const input = screen.getByPlaceholderText(/digite o nome do usuário/i);
        fireEvent.change(input, { target: { value: 'bruno' } });

        expect(mockSetUserName).toHaveBeenCalledWith('bruno');

    });

    test('chama onSearch ao clicar no botão', () => {
        const mockSetUserName = jest.fn();
        render(<Search userName="teste" setUserName={() => { }} onSearch={mockSetUserName} />);

        const button = screen.getByRole('button', { name: /buscar/i });
        fireEvent.click(button);

        expect(mockSetUserName).toHaveBeenCalled();
    });

    test('chama onSearch ao submeter o formulário', () => {
        const mockOnSearch = jest.fn();
        render(<Search userName="teste" setUserName={() => { }} onSearch={mockOnSearch} />);

        const form = screen.getByRole('form');
        fireEvent.submit(form);

        expect(mockOnSearch).toHaveBeenCalled();
    });
});