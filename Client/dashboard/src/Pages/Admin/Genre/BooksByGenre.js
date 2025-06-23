import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import api from "../../../ApiHandle/api";
import PageLoader from "../../../Components/PageLoader";
import {Box, Card, CardContent, CardMedia, Container, Grid, Typography} from "@mui/material";

const BooksByGenre = () => {
  const {genre} = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get(`http://localhost:5000/api/book/GetBooksByGenre/${genre}`, {skipAuth: true}).then((res) => {
      setData(res.data);
      setLoading(false);
    })
  }, [])
  return (
    <Container fluid sx={{padding: '1.5rem'}}>
      <Typography sx={{margin: '2rem 0'}} component={'h1'} variant={'h5'}>{data && data[0]?.genre?.name}</Typography>
      <Grid container spacing={2}>
        <PageLoader isLoading={loading}/>
        {data && data?.length > 0 ?
          data?.map((book, index) => (
            <Grid size={{md: 4, sm: 6}} key={index}>
              <Link style={{textDecoration: 'none'}} to={`/book/${book._id}`}>
                <Card sx={{height: '100%'}}>
                  <CardMedia sx={{height: 550, objectFit: 'cover'}}
                             image={`http://localhost:5000${book.image}`}
                             title={book.title}/>
                  <CardContent
                    sx={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <Typography variant="h6">{book.title}</Typography>
                      <Typography variant="body2">{book.genre.name}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                      <Typography variant="body2">{book.author}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))
          :
          <h5 className={'text-center'}>No Book Found in this Category</h5>
        }
      </Grid>
    </Container>
  );
};

export default BooksByGenre;