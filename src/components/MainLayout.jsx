import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const MainLayout = () => (
  <>
    <Navbar />
    <main className="page">
      <Outlet />
    </main>
    <Footer />
  </>
);

export default MainLayout;
