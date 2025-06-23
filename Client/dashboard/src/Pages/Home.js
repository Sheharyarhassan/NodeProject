import React, {useEffect, useState} from 'react'
import Skeleton from "react-loading-skeleton";
import api from "../ApiHandle/api";
import {Card, CardActions, CardContent, CardMedia, Container, Grid, Link, Typography} from "@mui/material";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    api.get("http://localhost:5000/api/book/getAllActive", {skipAuth: true}).then((response) => {
      setBooks(response.data);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    })
  }, [])
  return (
    <Container fixed>
      <h5 className={'pt-3'}>All Books</h5>
      <Grid container spacing={3} sx={{justifyContent: 'Evenly', alignItems: 'center'}}>
        {loading
          ? [...Array(8)].map((_, index) => (
            <Grid key={index} size={{lg: 4, md: 6, sm: 12}}>
              <Card>
                <Skeleton height={250}/>
                <CardContent>
                  <CardMedia>
                    <Skeleton variant="rectangular" width={210} height={60}/>
                  </CardMedia>
                  <CardActions>
                    <Skeleton variant="rectangular" width={210} height={60}/>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
          ))
          : books.map((book, index) => (
            <Grid key={index} size={{lg: 4, md: 6, sm: 12}}>
              <Link underline={'none'} href={`/book/${book._id}`}>
                <Card className={'h-100'}>
                  <CardMedia sx={{height: '500px', maxWidth: '100%', objectFit: 'cover'}}
                             image={`http://localhost:5000${book.image}`}
                             title={book.title}/>
                  <CardContent className={"d-flex justify-content-between"}>
                    <div>
                      <Typography variant="h5" gutterBottom>{book.title}</Typography>
                      <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        {book.author}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        {book.genre.name}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default Home