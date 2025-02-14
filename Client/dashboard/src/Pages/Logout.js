import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import api from "../ApiHandle/api";
import PageLoader from "../Components/PageLoader";

const Logout = () => {
   const token = JSON.parse(localStorage.getItem('token'));
   const adminToken = JSON.parse(localStorage.getItem('adminToken'));
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const logoutClient = async(isAdmin) => {
      console.log(isAdmin);
      setLoading(true);
      try{
         await api.post(
            isAdmin ?
               'http://localhost:5000/api/adminLogout' :
               'http://localhost:5000/api/logout', {},{isAdmin:isAdmin})
         isAdmin ?
            localStorage.removeItem('adminToken'):
            localStorage.removeItem('token');

         localStorage.removeItem('userType');

         isAdmin ? navigate('/adminLogin') : navigate('/login');
      }
      catch(err){
         console.log(err);
      }
      finally{
         setLoading(false);
      }
   }
   useEffect(() => {
      if(token){
         logoutClient(false)
      }
      else if(adminToken){
         logoutClient(true)
      }
   }, []);
   return (
      <div>
         <PageLoader isLoading={loading}/>
      </div>
   );
};

export default Logout;