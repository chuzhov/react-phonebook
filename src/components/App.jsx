import { Route, Routes, Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import { selectIsLogged } from './auth/authSelectors';
import { useEffect } from 'react';
import { getUserOp } from './auth/authOps';
import Navigation from './Navigation/Navigation';
import { Outlet } from 'react-router';
import ContactsPage from 'pages/ContactsPage';

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
  ) : (
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
  );
  {
  }
};

export default App;
