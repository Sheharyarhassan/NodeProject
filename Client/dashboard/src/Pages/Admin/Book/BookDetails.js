import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PageLoader from "../../../Components/PageLoader";
import api from "../../../ApiHandle/api";
import {toast, ToastContainer} from "react-toastify";
import {Button, Card, CardContent, Container, Grid} from "@mui/material";

const BookDetails = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const token = JSON.parse(localStorage.getItem("token"));
  const storedUser = JSON.parse(localStorage.getItem("userDetails"));
  const [cart, setCart] = useState(null);

  useEffect(() => {
    api.get(`http://localhost:5000/api/book/GetById/${id}`, {skipAuth: true}).then((response) => {
      setLoading(false);
      setData(response?.data);
    }).catch((err) => {
      setLoading(false);
      console.log(err);
    });
  }, [id]);
  useEffect(() => {
    if (storedUser) {
      api.get(`http://localhost:5000/api/getCart/${storedUser?.id}`).then(
        (res) => {
          const selectedData = res?.data?.cart?.item?.map((item1) => {
            if (item1._id === data?._id) {
              return item1;
            }
          })
          setCart(selectedData);
          setLoading(false);
        }
      )
    }
  }, [])
  const AddToCart = async (bookId) => {
    setLoading(true);
    const userId = storedUser.id;

    if (token) {
      const cartData = {userId: userId, bookId: bookId, quantity: 1};
      const response = await api.post(`http://localhost:5000/api/user/addToCart`, cartData);
      if (response.status === 200) {
        toast.success("Successfully added to cart!", {
          onClose: () => {
            setLoading(false);
            window.location.reload();
          }
        });
      }
    } else if (!token) {
      const cartData = {item: [{bookId: bookId, quantity: 1}]};
      const response = await api.post(`http://localhost:5000/api/addToCart`, cartData);
      if (response.status === 200) {
        toast.success("Successfully added to cart!", {
          onClose: () => {
            setLoading(false);
            window.location.reload();
          }
        });
      }
    }
  }
  return (
    <div>
      <PageLoader isLoading={loading}/>
      <ToastContainer autoClose={2000}/>
      <Container maxWidth="xl">
        <Grid container spacing={2} sx={{marginTop: '1.5rem'}}>
          <Grid size={{lg: 4, md: 6, xs: 12}}>

            <img src={'http://localhost:5000' + data?.image} alt={'BookImage'}
                 style={{maxWidth: '100%', height: 'auto'}}/>

          </Grid>
          <Grid size={{lg: 8, md: 6, xs: 12}}>
            <Card>
              <CardContent>
                <h3>{data?.title}</h3>
                <h5><span className="fw-normal">By: </span> {data?.author}</h5>
                <div dangerouslySetInnerHTML={{__html: data?.description}}/>
                <h6>Rs 3,000</h6>
                <h6>Available: {data?.quantity <= 0 ? 'Out of Stock' : data?.quantity}</h6>
                <Button disabled={data?.quantity <= 0 || data?.quantity <= cart?.quantity} className={'me-3'}
                        variant='contained'
                        onClick={() => AddToCart(data._id)}>Add to Cart</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default BookDetails;