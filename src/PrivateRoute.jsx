import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from "./AuthProvider";

const PrivateRoute = ({ element, requiredPermissions }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const hasAllPermissions = requiredPermissions.every(permission => user.permissions.includes(permission));

  if (!hasAllPermissions) {
    return <Navigate to="/acesso-negado" />;
  }

  return <Route element={element} />;
};

export default PrivateRoute;
