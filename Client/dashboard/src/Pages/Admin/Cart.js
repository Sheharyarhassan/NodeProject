import React, {useEffect, useState} from 'react';
import api from "../../ApiHandle/api";
import PageLoader from "../../Components/PageLoader";
import Cookies from "js-cookie";
import {Box, Button, Card, CardContent, CardMedia, Container, Grid, TextField, Typography} from "@mui/material";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [guestId, setGuestId] = useState(null);
  useEffect(() => {
    const id = Cookies.get('guestId');
    setGuestId(id);
    const storedUser = localStorage.getItem("userDetails");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    setUserDetails(parsedUser);
  }, []);
  useEffect(() => {
    if (userDetails?.id) {
      api.get(`http://localhost:5000/api/getCart/${userDetails?.id}`).then((res) => {
        setLoading(false);
        setData(res.data);
      })
    } else if (guestId) {
      api.get(`http://localhost:5000/api/getCart/${guestId}`).then((res) => {
        setLoading(false);
        setData(res.data);
      })
    }
  }, [userDetails])
  console.log(data?.cart?.item)
  return (
    <div>
      <PageLoader loading={loading}/>
      <Container fixed sx={{padding: '3rem'}}>
        <Box>
          {data && data?.length < 0 ? (
              <Typography component={'h1'} variant={'h5'} sx={{textAlign: 'center'}}>No data in Cart</Typography>
            )
            :
            data?.cart?.item?.map((item, index) => (
                <Card key={index} sx={{marginBottom: '1.5rem'}}>
                  <CardContent>
                    <Grid container spacing={2} sx={{justifyContent: {xs: 'center', sm: 'start'}}}>
                      <Grid size={{lg: 3, sm: 6}}>
                        <CardMedia height={'200'} component="img" sx={{objectFit: 'contain'}}
                                   image={'http://localhost:5000' + item?.book?.image}/>
                      </Grid>
                      <Grid spacing={3} size={{lg: 9, sm: 6}}>
                        <Typography component="h1" variant="h6"
                                    sx={{paddingBottom: '1rem'}}>{item?.book?.title}</Typography>
                        <Typography component={'body2'} sx={{paddingBottom: '1rem'}}>Quantity in
                          Cart: {item?.quantity}</Typography>
                        <Box sx={{paddingTop: '1rem'}}>
                          <TextField label={'Quantity'} variant={'outlined'} type={'number'} value={item?.quantity}/>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              )
            )}
        </Box>
        <Button variant={'contained'}>Check Out</Button>
      </Container>
    </div>
  );
};

export default Cart;