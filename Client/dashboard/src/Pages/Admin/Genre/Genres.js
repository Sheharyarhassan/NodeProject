import React, {useEffect, useState} from 'react';
import bgCard from '../../../Assets/Images/login-bg.png'
import api from "../../../ApiHandle/api";
import PageLoader from "../../../Components/PageLoader";
import {Link} from "react-router-dom";
import {Card, CardContent, Container, Grid, Typography} from "@mui/material";

const Genres = () => {
  const [loading, setLoading] = useState(true);
  const bgStyle = {
    backgroundImage: `url(${bgCard})`,
    backgroundSize: "cover",
    minHeight: "250px",
    height: '100%',
  }
  const [data, setData] = useState(null);
  useEffect(() => {
    api.get('http://localhost:5000/api/genre/getAllActive', {skipAuth: true}).then(res => {
      setData(res.data);
      setLoading(false)
    })
  }, [])
  return (
    <Container fluid sx={{padding: '1.5rem'}}>
      <Typography sx={{margin: '2rem 0'}} component={'h1'} variant={'h5'}>Categories</Typography>
      <PageLoader isLoading={loading}/>
      <Grid container spacing={2}>
        {data && data.length > 0 ?
          data.map((genre, index) => (
            <Grid size={{md: 4, sm: 6}} key={index}>
              <Link style={{textDecoration: 'none'}} to={`/genres/${genre?._id}`}>
                <Card style={bgStyle}>
                  <CardContent sx={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <h5 className={'text-light'}>{genre?.name}</h5>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))
          :
          <h5>No Categories Found</h5>
        }

      </Grid>
    </Container>
  );
};

export default Genres;