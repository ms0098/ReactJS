import * as React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/dashboard/Dashboard';

const PrivateRoutes: React.FC = () => (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    </>
);

export default PrivateRoutes;