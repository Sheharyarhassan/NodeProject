import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import api from "../ApiHandle/api";
import PageLoader from "../Components/PageLoader";

const Logout = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const logoutClient = async () => {
    setLoading(true);
    try {
      await api.post(`${process.env.BASE_URL}logout`, {})
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      window.dispatchEvent(new Event("authChange"));
      navigate('/login');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (token) {
      logoutClient()
    }
  }, [token]);
  return (
    <div>
      <PageLoader isLoading={loading}/>
    </div>
  );
};

export default Logout;