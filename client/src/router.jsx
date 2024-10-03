import {createBrowserRouter,redirect} from "react-router-dom";
// import RootLayout from "./RootLayout";
// import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
// import Register from "./pages/Register";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <h1>hloohhhhhh</h1>,
    },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) throw redirect("/");
      return null;
    },
  },
//   {
//     path: "/register", 
//     element: <Register />,
//   },
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
]);