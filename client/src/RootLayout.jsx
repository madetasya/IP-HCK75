import { Outlet } from "react-router-dom";
import Navbar from "./pages/Navbar";

export default function RootLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
