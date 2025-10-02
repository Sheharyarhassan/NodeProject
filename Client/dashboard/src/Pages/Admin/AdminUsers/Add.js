import React, {useState} from 'react';
import {toast, ToastContainer} from "react-toastify";
import PageLoader from "../../../Components/PageLoader";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import api from "../../../ApiHandle/api";
import {Box, Button, Container, styled, TextField, Typography} from "@mui/material";

const Add = () => {
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    name: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const validationSchema = Yup.object({
    name: Yup.string().required(),
    userName: Yup.string().required(),
    email: Yup.string().email('Invalid email format').required(),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[@$!%*?&]/, 'Password must contain at least one special character'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  })
  const navigate = useNavigate();
  const handleSubmit = async (values, {resetForm}) => {
    setIsLoading(true);
    const {confirmPassword, ...payload} = values;
    try {
      const response = await api.post(`${process.env.REACT_APP_BASE_URL}adminSignup`, payload)
      if (response.status === 201) {
        toast.success('Admin successfully registered!', {
          onClose: () => {
            setIsLoading(false)
            resetForm();
            navigate('/admin/view');
          }
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  const StyledErrorMessage = styled(ErrorMessage)`color: red`
  return (
    <Box>
      <ToastContainer autoClose={2000}/>
      <PageLoader isLoading={isLoading}/>
      <Container fixed sx={{padding: '1.5rem'}}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <Typography component='h1' variant='h5'>Add a new Admin</Typography>
            <Box sx={{marginTop: '1.5rem'}}>
              <Field as={TextField} fullWidth label={'Name'} className={'form-control'} type={'text'} name={'name'}
                     placeholder={'Enter Name'}/>
              <StyledErrorMessage className={'text-danger'} component={'div'} name={'name'}/>
            </Box>
            <Box sx={{marginTop: '1.5rem'}}>
              <Field as={TextField} fullWidth label={'User Name'} className={'form-control'} type={'text'}
                     name={'userName'}
                     placeholder={'Enter User Name'}/>
              <StyledErrorMessage className={'text-danger'} component={'div'} name={'userName'}/>
            </Box>
            <Box sx={{marginTop: '1.5rem'}}>
              <Field as={TextField} fullWidth label={'Email'} className={'form-control'} type={'email'} name={'email'}
                     placeholder={'Enter Email'}/>
              <StyledErrorMessage className={'text-danger'} component={'div'} name={'email'}/>
            </Box>
            <Box sx={{marginTop: '1.5rem'}}>
              <Field as={TextField} fullWidth label={'Password'} className={'form-control'} type={'password'}
                     name={'password'}
                     placeholder={'Enter Password'}/>
              <StyledErrorMessage className={'text-danger'} component={'div'} name={'password'}/>
            </Box>
            <Box sx={{marginTop: '1.5rem'}}>
              <Field as={TextField} fullWidth label={'Confirm Password'} className={'form-control'} type={'password'}
                     name={'confirmPassword'}
                     placeholder={'Confirm Password'}/>
              <StyledErrorMessage className={'text-danger'} component={'div'} name={'confirmPassword'}/>
            </Box>
            <Box sx={{marginTop: '1.5rem'}}>
              <Button variant='contained' type={'submit'}>Submit</Button>
            </Box>
          </Form>
        </Formik>
      </Container>
    </Box>
  );
};

export default Add;