import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { protectedRoutes, publicRoutes } from './Routes'; // Import named exports
import ProtectedRoute from './ProtectedRoute';

const index = () => {
  return (
    <Router>
        <Routes>
        {publicRoutes.map(({ path, component }, index) => (
          <Route key={index} path={path} element={component} />
        ))}
        {protectedRoutes.map(({ path, component }, index) => (
          <Route
            key={index}
            path={path}
            element={
              <ProtectedRoute isAuthenticated={false}>
                {component}
              </ProtectedRoute>
            }
          />
        ))}
        </Routes>
    </Router>
  )
}

export default index