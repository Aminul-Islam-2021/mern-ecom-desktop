import { createBrowserRouter } from "react-router-dom";
import Home from "../main/pages/Home";
import Layout from "../main/layout/Layout";
import Products from "../main/pages/Products";
import ProductDetails from "../main/pages/ProductDetails";
import SearchResult from "../main/pages/SearchResult";
import CartPage from "../main/pages/CartPage";
import NotFoundPage from "../main/pages/NotFoundPage";
import Login from "../main/pages/Login";
import Register from "../main/pages/Register";
import Protected from "./Protected";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Main layout for the app
    errorElement: <NotFoundPage />, // 404 page
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
        element: <Protected />,
        children: [
          {
            path: "/cart",
            element: <CartPage />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
