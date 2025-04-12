import { useProducts } from '../../hooks/useProducts';
import Divider from '@mui/material/Divider';
import Navbar from '../../components/navbar';
import ProductCarousel from '../../components/productCarousel';
import ProductCard from '../../components/productCard';
import SearchBar from '../../components/searchBar';
import { useFilterStore } from '../../state/filtersStore/filtersStore';
import { CircularProgress } from '@mui/material';

function Home() {

    const { products, loading, error } = useProducts();
    
    const category = useFilterStore((state) => state.category);
    const store = useFilterStore((state) => state.store);
    const searchTerm = useFilterStore((state) => state.searchTerm);
    const distance = useFilterStore((state) => state.distance);

    const filteredProducts = products.filter((product: any) => {
        const matchCategory = category ? product.category === category : true;
        const matchStore = store ? product.store === store : true;
        const matchSearch = !searchTerm || product.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchDistance = distance ? product.distanceCategory === distance.split(' ')[0] : true;

        return matchCategory && matchStore && matchSearch && matchDistance;
    });

    return (
        <>
            <Navbar />
            <section style={{ width: '100%', backgroundColor: '#fafafa', marginTop: '10vh' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {
                        loading ? 
                        <div style={{width: '100%', height: '30vh', display: 'flex', justifyContent: 'center', alignItems: 'center',}} >
                            <CircularProgress sx={{color: '#1B203E'}} size="3rem"/>
                        </div>
                        : (error) ? 
                        <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
                        : <ProductCarousel products={products.slice(0, 5)} />
                    }
                </div>
            </section>

            <Divider />

            <section
                style={{
                    width: '100%',
                    backgroundColor: '#fafafa',
                    color: 'black',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <h1>Here you will find everything you need</h1>
                <p>In our store you will find everything you desire from our products:</p>
                <div
                    style={{
                        width: '80%',
                        height: '10vh',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <SearchBar />
                </div>

                <div
                    style={{
                        width: '100%',
                        maxWidth: '1200px',
                        padding: '2rem',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        gap: '2rem',
                    }}
                >
                    {
                        loading ? 
                        <div style={{width: '100%', height: '30vh', display: 'flex', justifyContent: 'center', alignItems: 'center',}} >
                            <CircularProgress sx={{color: '#1B203E'}} size="3rem"/>
                        </div>
                        : (error) ? 
                        <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
                        : filteredProducts.map((product: any, index: number) => {
                            const distanceText = product.distance ? 
                                `${Number(product.distance).toFixed(1)} km` : 
                                'Distancia no disponible';
                            
                            return (
                                <div key={index} style={{ flex: '0 1 calc(33.333% - 2rem)' }}>
                                    <ProductCard
                                        image={product.image}
                                        title={product.title}
                                        description={product.description}
                                        price={product.price}
                                        category={product.category}
                                        store={product.store}
                                        distance={distanceText}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            </section>
        </>
    );
}

export default Home;
