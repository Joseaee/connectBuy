import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';

interface Props {
    image: string;
    title: string;
    description: string;
    price: number;
    category: string;
    store: string;
    distance: string;
}

function ProductCard({ image, title, description, price, category, store, distance }: Props) {
    return (
        <Card sx={{ 
            maxWidth: 345, 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            '& .MuiCardContent-root': {
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }
        }}>
            <CardMedia
                component="img"
                height="200"
                image={image}
                alt={title}
                sx={{ 
                    objectFit: 'contain',
                    padding: '1rem',
                    backgroundColor: '#f5f5f5'
                }}
            />
            <CardContent>
                <Typography 
                    gutterBottom 
                    variant="h6" 
                    component="div"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        height: '3.6em',
                        lineHeight: '1.2em'
                    }}
                >
                    {title}
                </Typography>
                <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        height: '4.5em',
                        mb: 2
                    }}
                >
                    {description}
                </Typography>
                <Box sx={{ mt: 'auto' }}>
                    <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                        ${Number(price).toFixed(2)}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip label={category} color="primary" size="small" />
                        <Chip label={store} color="secondary" size="small" />
                        <Chip label={distance} color="info" size="small" />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

export default ProductCard;