import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'; // You can use your authentication state management library

const PrivateRoute = ({ element, ...rest }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return isAuthenticated ? (
        <Route {...rest} element={element} />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default PrivateRoute;
