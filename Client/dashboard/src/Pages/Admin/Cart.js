import React, {useEffect, useState} from 'react';
import api from "../../ApiHandle/api";
import PageLoader from "../../Components/PageLoader";
import Cookies from "js-cookie";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear'
import {toast, ToastContainer} from "react-toastify";

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
  const getCartData = () => {
    if (userDetails?.id) {
      api.get(`${process.env.BASE_URL}getCart/${userDetails?.id}`).then((res) => {
        setLoading(false);
        setData(res.data);
      })
    } else if (guestId) {
      api.get(`${process.env.BASE_URL}getCart/${guestId}`).then((res) => {
        setLoading(false);
        setData(res.data);
      })
    }
  }
  useEffect(() => {
    getCartData()
  }, [userDetails])
  const handleRemoveItem = async (id) => {
    setLoading(true);
    try {
      if (userDetails?.id) {
        const response = await api.delete(`${process.env.BASE_URL}cart/remove/${userDetails?.id}?itemId=${id}`)
        console.log(response);
        if (response?.status === 200) {
          toast.success(response?.data?.message || 'Item Removed', {
            onClose: () => {
              setLoading(false);
              getCartData()
            }
          });
        }
      } else if (guestId) {
        const response = await api.delete(`${process.env.BASE_URL}cart/remove/${guestId}?itemId=${id}`)
        if (response.status === 200) {
          toast.success(response?.data?.message || 'Item Removed', {
            onClose: () => {
              setLoading(false);
              getCartData()
            }
          });
        }
      }
    } catch (e) {
      setLoading(false);
      toast.error(e)
    }
  }
  return (
    <div>
      <PageLoader loading={loading}/>
      <ToastContainer autoClose={2000}/>
      <Container fixed sx={{padding: '3rem'}}>
        <Box>
          {data && data?.cart?.item?.length === 0 ? (
              <Typography component={'h1'} variant={'h5'} sx={{textAlign: 'center'}}>No data in Cart</Typography>
            )
            :
            data?.cart?.item?.map((item, index) => (
                <Card key={index} sx={{marginBottom: '1.5rem'}}>
                  <CardContent>
                    <Grid container spacing={2} sx={{justifyContent: {xs: 'center', sm: 'start'}}}>
                      <Grid size={{lg: 3, sm: 3}}>
                        <CardMedia height={'200'} component="img" sx={{objectFit: 'contain'}}
                                   image={process.env.IMAGE_PATH + item?.book?.image}/>
                      </Grid>
                      <Grid size={{lg: 6, sm: 6}}>
                        <Typography component="h1" variant="h6"
                                    sx={{paddingBottom: '1rem'}}>{item?.book?.title}</Typography>
                        <Typography component={'span'} variant='body2' sx={{paddingBottom: '1rem'}}>Quantity in
                          Cart: {item?.quantity}</Typography>
                        <Box sx={{paddingTop: '1rem'}}>
                          <TextField label={'Quantity'} variant={'outlined'} type={'number'} value={item?.quantity}/>
                        </Box>
                      </Grid>
                      <Grid textAlign='end' size={{xs: 3}}>
                        <IconButton onClick={() => handleRemoveItem(item?._id)}>
                          <ClearIcon color='error'/>
                        </IconButton>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              )
            )}
        </Box>
        <Button sx={{m: 2}} variant='contained'>Check
          Out</Button>
      </Container>
    </div>
  );
};

export default Cart;