import React from 'react';
import {Navigate} from 'react-router-dom';

const ProtectedRoute = ({isAuthenticated, userType, children}) => {
  return isAuthenticated && userType?.toLowerCase() === "admin" ? children : <Navigate to="/login"/>;
};

export default ProtectedRoute;