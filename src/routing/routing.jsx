import { Navigate } from "react-router-dom";
import { AuthPage, MainLayout, MainPage } from "../pages";

export const routes = (isLoggedIn) => [
  {
    path: "/coffebringer",
    element: isLoggedIn ? (
      <MainLayout>
        <MainPage />
      </MainLayout>
    ) : (
      <Navigate to="/auth" />
    ),
  },
  {
    path: "/auth",
    element: isLoggedIn ? <Navigate to="/coffebringer" /> : <AuthPage />,
  },
  {
    path: "*",
    element: !isLoggedIn ? (
      <Navigate to="/auth" />
    ) : (
      <Navigate to="/coffebringer" />
    ),
  },
];
