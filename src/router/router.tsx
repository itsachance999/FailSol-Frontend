import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
const Dashboard = React.lazy(() => import("../pages/dashboard"));
const MintPage = React.lazy(() => import("../pages/MintPage"));
export const routers = createBrowserRouter([
  {
    // path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/mint",
        element: <MintPage />,
      },
    ],
  },
]);
