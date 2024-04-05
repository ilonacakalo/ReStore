import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import AboutPage from "../../features/about/AboutPage";
import Inventory from "../../features/inventory/Inventory";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import ContactPage from "../../features/contact/ContactPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
// import RequireAuth from "./RequireAuth";
import Home from "../../features/home/Home";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            //  {element: <RequireAuth />, children: [
            //  ]},
            {path: 'catalog', element: <Catalog />},
            {path: 'inventory', element: <Inventory />},
            {path: '', element: <Home />},
            {path: 'about', element: <AboutPage />},
            {path: 'contact', element: <ContactPage />},
            {path: 'catalog/:id', element: <ProductDetails />},
            {path: 'server-error', element: <ServerError />},
            {path: 'not-found', element: <NotFound />},
            {path: 'register', element: <Register />},
            {path: 'login', element: <Login />},
            {path: '*', element: <Navigate replace to='/not-found'/>}
        ]
    }
])