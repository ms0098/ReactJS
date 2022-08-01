import React, { useEffect } from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import Layout from '../pages/layout/Layout';
import { useLocation, useRoutes } from 'react-router-dom';
import Login from '../pages/auth/login/Login';
import PageNotFound from '../components/page-not-found/PageNotFound';
import Dashboard from '../pages/dashboard/Dashboard';
import { AuthProvider, AuthGuard, useAuth } from '../config/AuthGuard';

const GetRoutes = () => {
  let location = useLocation();
  console.log(location);
  let routes: RouteObject[] = [
    {
      path: "/",
      element: AuthGuard() ? <Layout />: <Navigate to={'/login'} state={{ from: location }} replace />,
      children: [
        // { index: true, element: <Dashboard /> },
        { path: '', element: <Navigate to={'dashboard'} />},
        {
          path: "dashboard",
          element: <Dashboard />,
          children: [
          ],
        },
      ],
    },
    { path: "/login", element: AuthGuard() ? <Navigate to={'/'} replace />: <Login /> },
    // { path: "sign-up", element: <Signup /> },
    { path: "*", element: <PageNotFound /> }
  ];
  return useRoutes(routes)
}

const Routing: React.FC = () => {
  return (<>
      <AuthProvider>
        {/* <Routes>
            <Route path='/' element={<Layout />} >
              <Route path='/' element={<Navigate to={'/dashboard'} />} />
              <Route path='/dashboard' element={<Dashboard />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes> */}
        <GetRoutes />
      </AuthProvider>
  </>)
};

export default Routing;