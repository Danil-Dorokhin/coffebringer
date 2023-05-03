import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Divider,
} from "@mui/material";
import { useUserContext } from "../../routing";

export const AuthPage = () => {
  const { login } = useUserContext();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    new FormData(e.currentTarget).forEach((value, key) => (data[key] = value));
    const { email, password } = data;
    login({ login: email, password });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography color="primary" component="h1" variant="h3">
          CoffeBringer Login
        </Typography>
      </Box>

      <Box component="form" noValidate onSubmit={handleOnSubmit} sx={{ mt: 3 }}>
        <Divider style={{ marginTop: 10, marginBottom: 10 }}></Divider>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign in
        </Button>
      </Box>
    </Container>
  );
};
