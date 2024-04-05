import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { status: productStatus } = useAppSelector(state => state.catalog);
  const product = useAppSelector(state => productSelectors.selectById(state, +id!));

  useEffect(() => {
    if (!product) dispatch(fetchProductAsync(parseInt(id!)));
  }, [id, dispatch, product])

  if (productStatus.includes('pending')) return <LoadingComponent message='Loading product...' />

  if (!product) return <NotFound />

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <div style={{ backgroundColor: '#bddcff', padding: '0px', borderRadius: '20px' }}>
          <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
        </div>
      </Grid>
      <Grid item xs={6}>
        <Typography variant='h3'>{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant='h4' color='secondary'>{(product.price / 100).toFixed(2)}€</Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}
