// Catalog.tsx
import { useState, useEffect } from 'react';
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { Grid, Paper, Typography, Button } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import AppPagination from "../../app/components/AppPagination";
import { Navigate, useLocation } from "react-router-dom";
import useProducts from "../../app/hooks/useProducts";
import { setPageNumber, setProductParams } from "./catalogSlice";

const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - High to low' },
    { value: 'price', label: 'Price- Low to high' },
];

export default function Catalog() {
    const { products, brands, types, filtersLoaded, metaData } = useProducts();
    const { user } = useAppSelector(state => state.account);
    const location = useLocation();

    const { productParams } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    const [clearFilters, setClearFilters] = useState(false);

    const clearAllFilters = () => {
        dispatch(setProductParams({
            brands: [],
            types: [],
            orderBy: 'name', // Reset to default sorting
            pageNumber: 1 // Reset to first page
        }));
        setClearFilters(true); // Trigger clearing of filters
    };

    useEffect(() => {
        // Reset clearFilters state after filters are cleared
        if (clearFilters) {
            setClearFilters(false);
        }
    }, [clearFilters]);

    if (!filtersLoaded) return <LoadingComponent message='Loading inventory catalog...' />;
    if (user) {
        return (
            <Grid container columnSpacing={4} rowSpacing={0}>
                <Grid item xs={3}>
                    <Paper sx={{ mb: 2 }}>
                        <ProductSearch />
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <RadioButtonGroup
                            selectedValue={productParams.orderBy}
                            options={sortOptions}
                            onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))}
                        />
                    </Paper>

                    <Paper sx={{ mb: 2, p: 2 }}>
                        <Typography>Types:</Typography>
                        <CheckboxButtons
                            items={types}
                            checked={productParams.types || []}
                            onChange={(items: string[]) => {
                                dispatch(setProductParams({
                                    types: items,
                                    pageNumber: 1
                                }));
                            }}
                            clear={clearFilters} // Pass clear prop
                        />
                    </Paper>

                    <Paper sx={{ mb: 2, p: 2 }}>
                        <Typography>Brands:</Typography>
                        <CheckboxButtons
                            items={brands}
                            checked={productParams.brands || []}
                            onChange={(items: string[]) => {
                                dispatch(setProductParams({
                                    brands: items,
                                    pageNumber: 1
                                }));
                            }}
                            clear={clearFilters} // Pass clear prop
                        />
                    </Paper>

                    <Button onClick={clearAllFilters} variant="outlined" color="secondary" sx={{ position: 'absolute' }}>
                        Clear Filters
                    </Button>
                </Grid>
                <Grid item xs={9}>
                    <ProductList products={products} />
                </Grid>
                <Grid item xs={3} />
                <Grid item xs={9} sx={{ mb: 2 }}>
                    <br></br>
                    {metaData &&
                        <AppPagination
                            metaData={metaData}
                            onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
                        />}
                </Grid>
            </Grid>
        )
    } else {
        return <Navigate to='/' state={{ from: location }} />
    }
}
