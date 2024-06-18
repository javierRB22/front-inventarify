import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/routes";
import "./index.css";
import ListaProducto from "./components/ListaProducto";
import CategoryList from "./components/CategoryList";
import ListaDepartamento from "./components/ListaDepartamento";
import ListaCliente from "./components/ListaCliente";
import ListaFactura from "./components/ListaFactura";
import ListaProveedor from "./components/ListaProveedor";
import ListaVenta from "./components/ListaVenta";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const router = createBrowserRouter([
  {
    path: "dashboard",
    element: <Root />,
    children: [
      {
        path: "Product",
        element: <ListaProducto />,
      },
      {
        path: "Category",
        element: <CategoryList />,
      },
      {
        path: "Departamentos",
        element: <ListaDepartamento />,
      },
      {
        path: "Clientes",
        element: <ListaCliente />,
      },
      {
        path: "Facturas",
        element: <ListaFactura />,
      },
      {
        path: "Proveedores",
        element: <ListaProveedor />,
      },
      {
        path: "Ventas",
        element: <ListaVenta />,
      },
    ],
  },

  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "SignUp",
    element: <SignUp/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
