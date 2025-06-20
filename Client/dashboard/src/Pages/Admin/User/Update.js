import React, {useEffect, useState} from 'react';
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast, ToastContainer} from "react-toastify";
import PageLoader from "../../../Components/PageLoader";
import api from "../../../ApiHandle/api";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, Container, TextField} from "@mui/material";

function Update() {
  const {id} = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    api.get(`http://localhost:5000/api/user/getById/${id}`).then(response => {
      setData(response.data);
    })
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    name: data && data.name || '',
    userName: data && data.userName || '',
    email: data && data.email || '',
  };
  const validationSchema = Yup.object({
    name: Yup.string().required(),
    userName: Yup.string().required(),
    email: Yup.string().email('Invalid email format').required(),
  })
  const navigate = useNavigate();
  const handleSubmit = async (values, {resetForm}) => {
    setIsLoading(true);
    const {confirmPassword, ...payload} = values;
    try {
      const response = await api.put(`http://localhost:5000/api/user/Update/${id}`, payload)
      if (response.status === 200) {
        toast.success('User successfully updated!', {
          onClose: () => {
            setIsLoading(false)
            resetForm();
            navigate(-1);
          }
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  return (
    <Box>
      <ToastContainer autoClose={2000}/>
      <PageLoader isLoading={isLoading}/>
      <Container fixed sx={{padding: '1.5rem'}}>
        <Formik enableReinitialize={true} initialValues={initialValues} validationSchema={validationSchema}
                onSubmit={handleSubmit}>
          <Form>
            <div className={"d-flex align-items-center justify-content-center"}>
              <h4 className={"fw-bold text-center"}>Update User</h4>
            </div>
            <Box sx={{marginTop: '1.5rem'}}>
              <Field as={TextField} fullWidth className={'form-control'} type={'text'} name={'name'}
                     placeholder={'Enter Name'}/>
              <ErrorMessage className={'text-danger'} component={'div'} name={'name'}/>
            </Box>
            <Box sx={{marginTop: '1.5rem'}}>
              <Field as={TextField} fullWidth className={'form-control'} type={'text'} name={'userName'}
                     placeholder={'Enter User Name'}/>
              <ErrorMessage className={'text-danger'} component={'div'} name={'userName'}/>
            </Box>
            <Box sx={{marginTop: '1.5rem'}}>
              <Field as={TextField} fullWidth className={'form-control'} type={'email'} name={'email'}
                     placeholder={'Enter Email'}/>
              <ErrorMessage className={'text-danger'} component={'div'} name={'email'}/>
            </Box>
            <Box sx={{marginTop: '1.5rem'}}>
              <Button variant='contained' type={'submit'}>Submit</Button>
            </Box>
          </Form>
        </Formik>
      </Container>
    </Box>
  );
}

export default Update;