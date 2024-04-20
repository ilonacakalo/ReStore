import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import { currencyFormat } from "../../app/util/util";


interface Props {
    product: Product;

}

export default function ProductCard({ product }: Props) { // Ensure onDelete is included in Props


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
                        textAlign: 'left',
                        overflow: 'hidden'
                    }
                }}
            />
            <CardMedia
                component="img"
                sx={{height: 146, bgcolor: '#bddcff', objectFit: 'contain'}}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom color="secondary" variant="h5">
                    {currencyFormat(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Type: {product.type}
                    <br></br>
                    Brand: {product.brand}
                    <br></br>
                    Quantity: {product.quantityInStock}
                </Typography>
            </CardContent>
            <CardActions>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>

            </CardActions>
        </Card>
    );
}
