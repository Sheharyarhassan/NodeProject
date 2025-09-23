import React, {useEffect, useState} from 'react';
import api from "../../ApiHandle/api";
import PageLoader from "../../Components/PageLoader";
import {Box, Container, Divider, Typography} from "@mui/material";
import BarCharts from "../../Components/BarCharts";
import PieChart from "../../Components/PieChart";

function Admin() {

  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setUserLoading(true);
    api.get('book/GetBooksCountALlGenre').then(async (res) => {
      try {
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })
    api.get('/user/getUserChartData').then(async (res) => {
      try {
        setUserData(res.data);
        setUserLoading(false);
      } catch (err) {
        console.log(err);
        setUserLoading(false);
      }
    })
  }, [])
  const anyLoading = [userLoading, loading].some(Boolean);
  const user = JSON.parse(localStorage.getItem('userDetails'));
  return (
    <React.Fragment>
      <PageLoader isLoading={anyLoading}/>
      <Container maxWidth="2xl">
        <Typography sx={{fontWeight: 'bold', textAlign: 'center', mt: 5, mb: 7}} component={'h1'} variant={'h3'}>
          Welcome! {user && user?.name} <br/>to
          Admin
          Dashboard
        </Typography>
        <Box sx={{mx: 'auto', mb: 4}} maxWidth={'md'}>
          <Typography component="h3" variant='h6' sx={{fontWeight: 'semibold'}}>
            Books by Categories
          </Typography>
          <Divider sx={{mb: 3}}/>
          <BarCharts data={data && data}/>
        </Box>
        <Box sx={{mx: 'auto'}} maxWidth={'md'}>
          <Typography component="h3" variant='h6' sx={{fontWeight: 'semibold'}}>
            Users Details
          </Typography>
          <Divider sx={{mb: 3}}/>
          <PieChart data={userData && userData}/>
        </Box>

      </Container>
    </React.Fragment>
  );
}

export default Admin;