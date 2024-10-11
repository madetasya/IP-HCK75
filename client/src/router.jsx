import { createBrowserRouter, redirect } from "react-router-dom";
import RootLayout from "./RootLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import Navbar from "./pages/Navbar";
import ArticleDetail from "./pages/ArticleDetail";
import ArticleEdit from "./pages/ArticleEdit";
import CreateArticle from "./pages/CreateArticle";
import WeeklyDisaster from "./pages/WeeklyDisaster";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        return null;
      }
      throw redirect("/login");
    },
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/:id",
        element: <ArticleDetail />,
      },
      {
        path: "/:id/edit",
        element: <ArticleEdit />,
      },
      {
        path: "/create-article",
        element: <CreateArticle />,
      },
      {
        path: "/result",
        element: <WeeklyDisaster />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    // loader: () => {
    //   const access_token = localStorage.getItem("access_token");
    //   if (access_token) throw redirect("/");
    //   return null;
    // },
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

//   {
//     path: "/admin",
//     element: <RootLayout />,
//     loader: () => {
//       const access_token = localStorage.getItem("access_token");
//       if (!access_token) throw redirect("/login");
//       return null;
//     },
//     children: [
//       { path: "", element: <h1>Hello Wolrf</h1>},
//     ],
//   },
