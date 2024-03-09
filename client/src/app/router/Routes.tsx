import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Catalog from "../../features/catalog/catalog/Catalog";
import ProductDetails from "../../features/catalog/catalog/ProductDetails";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '/catalog', element: <Catalog />},
            {path: 'catalog/:id', element: <ProductDetails />},
        ]
    }
])