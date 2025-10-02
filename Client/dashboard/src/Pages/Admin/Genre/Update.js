import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import * as Yup from 'yup';
import api from "../../../ApiHandle/api";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast, ToastContainer} from "react-toastify";
import PageLoader from "../../../Components/PageLoader";

const Update = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    api.get(`${process.env.BASE_URL}genre/getById/${id}`).then(res => {
      setLoading(false);
      setData(res.data);
    })
  }, [])
  const initialValues = {
    name: data && data?.name || ''
  }
  const validationSchema = Yup.object({
    name: Yup.string().required('Genre Name is Required'),
  })
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await api.put(`${process.env.BASE_URL}genre/Update/${id}`, values)
      if (response.status === 200) {
        setLoading(false);
        toast.success('Genre Updated Successfully', {
          onClose: () => {
            navigate('/genre/');
          }
        });
      }
    } catch (e) {
      console.log(e)
      setLoading(false);
    }
  }
  return (
    <Container fixed sx={{py: 4}}>
      <ToastContainer autoClose={2000}/>
      <PageLoader isLoading={loading}/>
      <Typography component="h1" variant={'h5'} sx={{mb: 2}}>Update Genre</Typography>
      <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema}
              onSubmit={handleSubmit}>
        <Form>
          <Box sx={{mb: 2}}>
            <Field as={TextField} name="name" fullWidth label={'Genre Name'} type={'text'}/>
            <ErrorMessage name="name" component="div" sx={{color: 'red'}}/>
          </Box>
          <Box sx={{mb: 2}}>
            <Button type={'submit'} variant={'contained'}>Submit</Button>
          </Box>
        </Form>
      </Formik>
    </Container>
  );
};

export default Update;