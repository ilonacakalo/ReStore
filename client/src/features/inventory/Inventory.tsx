import { Edit, Delete } from '@mui/icons-material';
import { Box, Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { currencyFormat } from '../../app/util/util';
import useProducts from '../../app/hooks/useProducts';
import AppPagination from '../../app/components/AppPagination';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { removeProduct, setPageNumber } from '../catalog/catalogSlice';
import { useState } from 'react';
import ProductForm from './ProductForm';
import { Product } from '../../app/models/product';
import agent from '../../app/api/agent';
import { LoadingButton } from '@mui/lab';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Navigate, useLocation } from 'react-router-dom';

export default function Inventory() {
    const { user } = useAppSelector(state => state.account);
    const location = useLocation();
    const { products, metaData, productsLoaded } = useProducts();
    const [editMode, setEditMode] = useState(false);
    const dispatch = useAppDispatch();
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [target, setTarget] = useState(0);

    function handleSelectProduct(product: Product) {
        setSelectedProduct(product);
        setEditMode(true);
    }
    function cancelEdit() {
        if (selectedProduct) setSelectedProduct(undefined);
        setEditMode(false);
    }

    function handleDeleteProduct(id: number) {
        setLoading(true);
        setTarget(id)
        agent.Edit.deleteProduct(id)
            .then(() => dispatch(removeProduct(id)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    if (editMode) return <ProductForm cancelEdit={cancelEdit} product={selectedProduct} />
    if (!productsLoaded) return <LoadingComponent message='Loading inventory items...' />
    if (user){
    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>Inventory</Typography>
                <Button
                    sx={{ m: 2 }}
                    size='large' variant='contained'
                    onClick={() => setEditMode(true)}
                >
                    Create
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Item</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Brand</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
    {products.map((product) => (
        <TableRow
            key={product.id} // Assign a unique key using product ID
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="left">
                <Box display='flex' alignItems='center'>
                    <img src={product.pictureUrl} alt={product.name} style={{ height: 50, marginRight: 20 }} />
                    <span>{product.name}</span>
                </Box>
            </TableCell>
            <TableCell align="right">{currencyFormat(product.price)}</TableCell>
            <TableCell align="center">{product.type}</TableCell>
            <TableCell align="center">{product.brand}</TableCell>
            <TableCell align="center">{product.quantityInStock}</TableCell>
            <TableCell align="right">
                <Button
                    startIcon={<Edit />}
                    onClick={() => handleSelectProduct(product)}
                />
                <LoadingButton
                    loading={loading && target === product.id}
                    startIcon={<Delete />} color='error'
                    onClick={() => handleDeleteProduct(product.id)}
                />
            </TableCell>
        </TableRow>
    ))}
</TableBody>
                </Table>
            </TableContainer>
            {metaData &&
                <Box sx={{ pt: 2 }}>
                    <AppPagination
                        metaData={metaData}
                        onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
                    />
                </Box>
            }
        </>
    )
        }
    else
{
    return <Navigate to='/' state={{from: location}} />
}
}