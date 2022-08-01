import { Navigate, Outlet, Route, RouteObject, Routes, useNavigate, useRoutes } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import PageNotFound from '../../components/page-not-found/PageNotFound';
import { AuthProvider, useAuth } from '../../config/AuthGuard';
import { Button } from 'antd';

const Layout: React.FC = () => {
    let auth = useAuth();
    let navigate = useNavigate();
    function logout() {
        localStorage.removeItem('accessToken');
        auth.token = null;
        navigate('/login');
    }

    return ( <>
        <div className="h-100">
            <h1>Layout</h1>
            <Outlet />

            <Button onClick={logout} type="default" htmlType="button">Logout</Button>
        </div>
    </>)
};

export default Layout;
