import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import SeriesDetailPage from "./pages/SeriesDetailPage.jsx";
import SeasonPage from "./pages/SeasonPage.jsx";
import WatchPage from "./pages/WatchPage.jsx";
import MyShowsPage from "./pages/MyShowsPage.jsx";
import ListsPage from "./pages/ListsPage.jsx";
import CommunityPage from "./pages/CommunityPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "busca", element: <SearchPage /> },
      { path: "minha-lista", element: <MyShowsPage /> },
      { path: "biblioteca", element: <WatchPage /> },
      { path: "listas", element: <ListsPage /> },
      { path: "comunidade", element: <CommunityPage /> },
      { path: "perfil", element: <ProfilePage /> },
      { path: "serie/:id", element: <SeriesDetailPage /> },
      {
        path: "serie/:id/temporada/:temporada",
        element: <SeasonPage />,
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
