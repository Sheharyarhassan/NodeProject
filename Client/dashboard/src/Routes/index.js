import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {protectedRoutes, publicRoutes} from './Routes'; // Import named exports
import ProtectedRoute from './ProtectedRoute';
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const index = () => {
  const token = localStorage.getItem("token") && JSON.parse(localStorage.getItem("token"));
  const userType = localStorage.getItem("userType") && JSON.parse(localStorage.getItem("userType"));
  return (
    <>
      <Header/>
      <Router>
        <Routes>
          {publicRoutes.map(({path, component}, index) => (
            <Route key={index} path={path} element={component}/>
          ))}
          {protectedRoutes.map(({path, component}, index) => (
            <Route
              key={index}
              path={path}
              element={
                <ProtectedRoute isAuthenticated={token} userType={userType}>
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