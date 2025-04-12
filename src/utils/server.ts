import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import axios from 'axios';

const server = createServer();
const wss = new WebSocketServer({ server });

async function getRandomProducts(count: number) {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const products = response.data;
        const randomProducts = [];
        
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * products.length);
            randomProducts.push(products[randomIndex]);
        }
        
        return randomProducts;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return [];
    }
}

wss.on('connection', async (ws) => {
    console.log('Cliente conectado');

    ws.send(JSON.stringify({ 
        title: 'Welcome',
        body: '!You will receive offers!',
    }));

    setInterval(async () => {
        const products = await getRandomProducts(1);
        if (products.length > 0) {
            const product = products[0];
            const notification = {
                id: Date.now(),
                title: '!Special offer!',
                body: `¡${product.title} now with 20% discount!`,
                product: product
            };

            ws.send(JSON.stringify(notification));
        }
    }, 10000);

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

server.listen(8088, () => {
    console.log('Servidor WebSocket escuchando en ws://localhost:8088');
});
