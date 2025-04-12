import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../index';
import { useNotifications } from '../../../hooks/useNotifications';

// Mock del hook useNotifications
jest.mock('../../../hooks/useNotifications');

describe('Navbar', () => {
    const mockNotifications = [
        { id: 1, title: 'Oferta 1', body: 'Descripción 1', viewed: false },
        { id: 2, title: 'Oferta 2', body: 'Descripción 2', viewed: false }
    ];

    beforeEach(() => {
        (useNotifications as jest.Mock).mockReturnValue({
            notifications: mockNotifications,
            unviewedCount: 2,
            markAsViewed: jest.fn()
        });
    });

    it('debería mostrar el contador de notificaciones no vistas', () => {
        render(<Navbar />);
        const badge = screen.getByText('2');
        expect(badge).toBeInTheDocument();
    });

    it('debería mostrar el menú de notificaciones al hacer clic en el icono', () => {
        render(<Navbar />);
        const button = screen.getByRole('button', { name: /notificaciones/i });
        fireEvent.click(button);
        
        expect(screen.getByText('Oferta 1')).toBeInTheDocument();
        expect(screen.getByText('Oferta 2')).toBeInTheDocument();
    });

    it('debería marcar una notificación como vista al hacer clic en el icono del ojo', () => {
        const mockMarkAsViewed = jest.fn();
        (useNotifications as jest.Mock).mockReturnValue({
            notifications: mockNotifications,
            unviewedCount: 2,
            markAsViewed: mockMarkAsViewed
        });

        render(<Navbar />);
        const button = screen.getByRole('button', { name: /notificaciones/i });
        fireEvent.click(button);
        
        const eyeIcons = screen.getAllByTestId('RemoveRedEyeIcon');
        fireEvent.click(eyeIcons[0]);
        
        expect(mockMarkAsViewed).toHaveBeenCalledWith(1);
    });

    it('debería mostrar "Sin notificaciones" cuando no hay notificaciones', () => {
        (useNotifications as jest.Mock).mockReturnValue({
            notifications: [],
            unviewedCount: 0,
            markAsViewed: jest.fn()
        });

        render(<Navbar />);
        const button = screen.getByRole('button', { name: /notificaciones/i });
        fireEvent.click(button);
        
        expect(screen.getByText('Sin notificaciones')).toBeInTheDocument();
    });
}); 