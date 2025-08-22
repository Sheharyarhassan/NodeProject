import React, {useEffect, useState} from 'react';
import Skeleton from "react-loading-skeleton";
import api from "../ApiHandle/api";
import {Box, Button, Card, CardContent, CardMedia, Container, Grid, Typography} from "@mui/material";
import {Link} from 'react-router-dom';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [pagesValues, setPagesValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await api.get(`http://localhost:5000/api/book/getAllActive?page=${currentPage}&limit=${limit}`, {
        skipAuth: true
      });
      const newBooks = res?.data?.books || [];
      setBooks(prev => {
        const existingIds = new Set(prev.map(b => b._id));
        const uniqueBooks = newBooks.filter(b => !existingIds.has(b._id));
        return [...prev, ...uniqueBooks];
      });
      setPagesValues(res.data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  console.log(books)
  useEffect(() => {
    fetchBooks();
  }, [currentPage]);
  const handlePageChange = () => {
    if (pagesValues?.currentPage === pagesValues?.totalPages - 1) {
      setHasMore(false)
    }
    setCurrentPage(currentPage + 1);
  }
  useEffect(() => {
    if (pagesValues?.currentPage > pagesValues?.totalPages - 1) {
      setHasMore(false)
    }
  }, [pagesValues]);
  return (
    <Container sx={{py: 3}} fixed>
      <h5 className={'pt-3'}>All Books</h5>
      <Grid container alignItems="stretch" spacing={3} sx={{justifyContent: 'Evenly'}}>
        {loading
          ? [...Array(4)].map((_, index) => (
            <Grid key={index} item size={{lg: 4, md: 6, sm: 12}}>
              <Card>
                <Skeleton height={250}/>
                <CardContent>
                  <Skeleton height={30}/>
                </CardContent>
              </Card>
            </Grid>
          ))
          : books?.map((book, index) => (
            <Grid key={index} size={{lg: 4, md: 6, sm: 12}}>
              <Card sx={{height: "100%", width: '100%'}}>
                <Link style={{textDecoration: 'none'}} to={`/book/${book._id}`}>
                  <CardMedia
                    component={'img'}
                    sx={{height: {md: '590px', xs: '100%'}, width: '100%', objectFit: 'cover'}}
                    image={`http://localhost:5000${book.image}`}
                    title={book.title}
                  />
                  <CardContent>
                    <Box display={'flex'} justifyContent={'space-between'}>
                      <div>
                        <Typography variant="h5" gutterBottom>{book.title}</Typography>
                        <Typography variant="body2" sx={{color: 'text.secondary'}}>{book.author}</Typography>
                      </div>
                      <div>
                        <Typography variant="body2" sx={{color: 'text.secondary'}}>{book.genre?.name}</Typography>
                      </div>
                    </Box>
                  </CardContent>
                </Link>
              </Card>
            </Grid>
          ))}
      </Grid>
      {hasMore && (
        <Box sx={{textAlign: 'center', py: 3}}>
          <Button variant="contained" onClick={() => {
            handlePageChange()
          }} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Home;
