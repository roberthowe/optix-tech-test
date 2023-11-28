import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { Notification } from "@/components/Notification";
import { store } from "@/stores";

const theme = createTheme({
  typography: {
    h1: {
      fontSize: "2em",
    },
    h2: {
      fontSize: "1.5em",
    },
  },
});

const ErrorFallback = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={6}>
          <Typography variant="h2" sx={{ my: 2 }}>
            Ooops, something went wrong 🙃
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.assign(window.location.origin)}
          >
            Try Again
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <Notification />
              <Router>{children}</Router>
            </ThemeProvider>
          </Provider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
