import { useEffect, useState } from 'react';
import axios from 'axios';
import { generateRandomLocation, getStoreDistance, getDistanceCategory } from '../utils/location';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    store: string;
    location?: {
        latitude: number;
        longitude: number;
    };
    distance?: number;
    distanceCategory?: string;
}

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://fakestoreapi.com/products');

                const stores = ['Amazon', 'eBay', 'AliExpress'];
                const enrichedProducts: Product[] = response.data.map((product: Product, index: number) => {
                    const location = generateRandomLocation();
                    const distance = getStoreDistance(location);
                    const distanceCategory = getDistanceCategory(distance);

                    return {
                        ...product,
                        store: stores[index % stores.length],
                        location,
                        distance,
                        distanceCategory
                    };
                });

                setProducts(enrichedProducts);
            } catch (err) {
                setError('Error al obtener productos');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
}
