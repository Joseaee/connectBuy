import { renderHook, act } from '@testing-library/react';
import { useNotifications } from '../useNotifications';

class MockWebSocket {
    onmessage: ((event: { data: string }) => void) | null = null;
    onclose: (() => void) | null = null;
    close = jest.fn();
    send = jest.fn();
}

global.WebSocket = MockWebSocket as any;

describe('useNotifications', () => {
    let mockSocket: MockWebSocket;

    beforeEach(() => {
        mockSocket = new MockWebSocket();

        (global as any).WebSocket = jest.fn().mockImplementation(() => mockSocket);
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('debería inicializar con notificaciones vacías', () => {
        const { result } = renderHook(() => useNotifications());
        expect(result.current.notifications).toEqual([]);
        expect(result.current.unviewedCount).toBe(0);
    });

    it('debería agregar una nueva notificación cuando llega un mensaje', () => {
        const { result } = renderHook(() => useNotifications());

        act(() => {
            if (mockSocket.onmessage) {
                mockSocket.onmessage({
                    data: JSON.stringify({
                        id: 1,
                        title: 'Nueva oferta',
                        body: '¡Producto en oferta!'
                    })
                });
            }
        });

        expect(result.current.notifications).toHaveLength(1);
        expect(result.current.notifications[0].title).toBe('Nueva oferta');
        expect(result.current.unviewedCount).toBe(1);
    });

    it('debería marcar una notificación como vista', () => {
        const { result } = renderHook(() => useNotifications());
        

        act(() => {
            if (mockSocket.onmessage) {
                mockSocket.onmessage({
                    data: JSON.stringify({
                        id: 1,
                        title: 'Nueva oferta',
                        body: '¡Producto en oferta!'
                    })
                });
            }
        });

        // Marcar como vista
        act(() => {
            result.current.markAsViewed(1);
        });

        expect(result.current.notifications[0].viewed).toBe(true);
        expect(result.current.unviewedCount).toBe(0);
    });

    it('debería cerrar la conexión WebSocket al desmontar', () => {
        const { unmount } = renderHook(() => useNotifications());
        unmount();
        expect(mockSocket.close).toHaveBeenCalled();
    });
}); 