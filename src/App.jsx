import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { AppDataProvider } from "./components/useAppData.js";

const App = () => {
  return (
    <AppDataProvider>
      <Navbar />
      <main className="page">
        <Outlet />
      </main>
      <Footer />
    </AppDataProvider>
  );
};

export default App;
