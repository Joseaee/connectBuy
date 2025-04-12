import { useEffect, useState } from 'react';
import axios from 'axios';

export function useCategories() {
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://fakestoreapi.com/products/categories');
                setCategories(response.data);
            } catch (err) {
                setError('Error al obtener las categorías');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
}
