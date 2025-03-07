import { createBrowserRouter } from "react-router";
import Home from "@/pages/home";
import Detail from "@/pages/blogdetail";
import Layout from "@/layout/layout";
import Shop from "@/pages/shop";
import Cart from "@/pages/cart";
export const Router = createBrowserRouter([
  {
    path: "/",
    id: "layout",
    element: <Layout />,
    children: [
      {
        path: "/",
        id: "home",
        element: <Home/>,
      },
      {
        path: "/shop",
        id: "shop",
        element: <Shop/>,
      },
      {
        id: "detail",
        path: "shop/:id",
        element: <Detail />,
      },
      {
        path: "/cart",
        id: "cart",
        element: <Cart/>,
      },
    ],
  },
]);
