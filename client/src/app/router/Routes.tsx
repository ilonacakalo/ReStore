import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Catalog from "../../features/catalog/catalog/Catalog";
import ProductDetails from "../../features/catalog/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import Inventory from "../../features/inventory/Inventory";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <Inventory />},
            {path: 'about', element: <AboutPage />},
            {path: 'catalog', element: <Catalog />},
            {path: 'catalog/:id', element: <ProductDetails />},
            {path: 'server-error', element: <ServerError />},
            {path: 'not-found', element: <NotFound />},
            {path: '*', element: <Navigate replace to='/not-found'/>}
        ]
    }
])