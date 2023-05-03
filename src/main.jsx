import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider, useUserContext, routes } from "./routing";
import "./styles/global.css";
import { brown } from "@mui/material/colors";

const App = () => {
  const { user } = useUserContext();
  const router = createBrowserRouter(routes(!!user));
  return <RouterProvider router={router} />;
};

const theme = createTheme({
  palette: {
    primary: brown,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>
);
