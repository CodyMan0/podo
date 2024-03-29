import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import LoginPage from 'scenes/loginPage';
import HomePage from 'scenes/homePage';
import ProfilePage from 'scenes/profilePage';
import NotFound from 'scenes/notFound';
import ProtectedRoute from 'layouts/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/home"
          element={<HomePage />}
        />
        <Route
          path="/profile/:userId"
          element={<ProfilePage />}
          errorElement={<NotFound/>}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  ),
  {
    basename: '/podo',
  }
);

const App = () => {
  const mode = useSelector(state => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
};

export default App;
