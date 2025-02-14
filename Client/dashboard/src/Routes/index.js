import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { protectedRoutes, publicRoutes } from './Routes'; // Import named exports
import ProtectedRoute from './ProtectedRoute';
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const index = () => {
   const adminToken = JSON.parse(localStorage.getItem('adminToken'));
   return (
      <>
         <Header/>
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
                    <ProtectedRoute isAuthenticated={adminToken}>
                      {component}
                    </ProtectedRoute>
                  }
                />
              ))}
              </Routes>
          </Router>
         <Footer/>
      </>
  )
}

export default index