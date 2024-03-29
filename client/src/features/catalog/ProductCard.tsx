import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: 300 }}>
            <CardHeader
                title={product.name}
                titleTypographyProps={{
                    sx: {
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "primary.main",
                        minHeight: '2.5em',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        textAlign: 'leftr',
                        overflow: 'hidden'
                    }
                }}
            />
            <CardMedia
                component="img"
                sx={{height: 146, bgcolor: "primary.light", objectFit: 'contain'}}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom color="secondary" variant="h5">
                    {(product.price / 100).toFixed(2)}€
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    );
}