import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Navigation from './Navigation/Navigation';
import HomePage from '../pages/HomePage';
import ContactsPage from 'pages/ContactsPage';

import { selectIsLogged } from './redux/auth/authSelectors';
import { getUserOp } from './redux/auth/authOps';
import CustomizedSnackbars from './redux/snackbar/Snackbar.jsx';

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

  return (
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
        <Route
          path="/login"
          element={<PublicRoute component={<LoginPage />} />}
        />
        <Route
          path="/register"
          element={<PublicRoute component={<RegisterPage />} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
