import { useEffect, useState } from 'react';
import { Product } from './useProducts';

interface Notification {
    id: number;
    title: string;
    body: string;
    product?: Product;
    viewed?: boolean;
}

export function useNotifications() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8088');
        setSocket(ws);

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.title && data.body) {
                    setNotifications((prev) => [data, ...prev]);
                }
            } catch (error) {
                console.error('Error al parsear la notificación:', error);
            }
        };

        ws.onclose = () => {
            console.log('WebSocket cerrado.');
        };

        return () => {
            ws.close();
        };
    }, []);

    const markAsViewed = (id: number) => {
        setNotifications(prev => 
            prev.map(notif => 
                notif.id === id ? { ...notif, viewed: true } : notif
            )
        );
    };

    const unviewedCount = notifications.filter(notif => !notif.viewed).length;

    return { notifications, markAsViewed, unviewedCount };
}
