import { createBrowserRouter } from "react-router-dom";
import Home from "../main/pages/Home";
import Layout from "../main/layout/Layout";
import Products from "../main/pages/Products";
import ProductDetails from "../main/pages/ProductDetails";
import SearchResult from "../main/pages/SearchResult";
import CartPage from "../main/pages/CartPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/search",
        element: <SearchResult />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
]);
