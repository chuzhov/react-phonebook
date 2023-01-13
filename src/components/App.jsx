import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import { selectIsLogged } from './auth/authSelectors';
import { getUserOp } from './auth/authOps';
import Navigation from './Navigation/Navigation';
import ContactsPage from 'pages/ContactsPage';
import CustomizedSnackbars from './snackbar/Snackbar.jsx';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOp());
  }, [dispatch]);

  const PrivateRoute = ({ component, redirectTo = '/login' }) => {
    const isAuth = useSelector(selectIsLogged);
    return isAuth ? component : <Navigate to={redirectTo} />;
  };

  const PublicRoute = ({ component, redirectTo = '/' }) => {
    const isAuth = useSelector(selectIsLogged);
    return !isAuth ? component : <Navigate to={redirectTo} />;
  };

  const SharedLayout = () => {
    return (
      <>
        <Navigation />
        <Outlet />
      </>
    );
  };

  const isLogged = useSelector(selectIsLogged);
  return isLogged ? (
    <>
      <CustomizedSnackbars />
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<PrivateRoute component={<HomePage />} />} />
          <Route
            path="/contacts"
            element={<PrivateRoute component={<ContactsPage />} />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  ) : (
    <>
      <CustomizedSnackbars />
      <Routes>
        <Route
          path="/login"
          element={<PublicRoute component={<LoginPage />} />}
        />
        <Route
          path="/register"
          element={<PublicRoute component={<RegisterPage />} />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default App;
