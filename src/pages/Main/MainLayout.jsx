import React from "react";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import styles from "../../styles/MainLayout.module.css";
import { useUserContext } from "../../routing";

export const MainLayout = ({ children = null }) => {
  const { logout } = useUserContext();
  return (
    <div>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h4" color="primary" noWrap sx={{ flexGrow: 1 }}>
            CoffeBringer
          </Typography>
          <nav>
            <Button onClick={logout} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Sign out
            </Button>
          </nav>
        </Toolbar>
      </AppBar>

      <main className={styles.main}>
        <div className={styles["main-container"]}>{children}</div>
      </main>
    </div>
  );
};
