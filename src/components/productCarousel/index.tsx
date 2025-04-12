
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import ProductCard from '../productCard';
import './productCarousel.css';

interface Props {
    products: Array<{
        image: string
        title: string
        description: string
        price: number
        category: string,
        store: string,
        distance?: number;
    }>
}

function ProductCarousel({ products } : Props) {
    const responsive = {
        superLargeDesktop: {
        breakpoint: { max: 4000, min: 1200 },
        items: 4,
        },
        desktop: {
        breakpoint: { max: 1200, min: 900 },
        items: 3,
        },
        tablet: {
        breakpoint: { max: 900, min: 600 },
        items: 2,
        },
        mobile: {
        breakpoint: { max: 600, min: 0 },
        items: 1,
        },
    };

    return (
        <Carousel
            responsive={responsive}
            infinite
            arrows
            autoPlay={true}
            keyBoardControl
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
        >
            {products.map(({image, title, description, price, category, store, distance}, index) => {
                
                return (<ProductCard 
                key={index}
                title={title}
                description={description}
                price={price} 
                image={image} 
                category={category} 
                store={store}
                distance={distance ? `${Number(distance).toFixed(1)} km` : 'Distancia no disponible'}
                />)
            })}
        </Carousel>
    );
}

export default ProductCarousel;
