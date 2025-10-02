import React, {useState} from 'react';
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import background from "../Assets/Images/Login_Bg.jpg";
import {toast, ToastContainer} from "react-toastify";
import PageLoader from "../Components/PageLoader";
import book from "../Assets/Images/Book2.png";
import api from "../ApiHandle/api";
import {useNavigate} from "react-router-dom";
import {Box, Button, Container, styled, TextField} from "@mui/material";

function Register() {
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
      const response = await api.post(`${process.env.BASE_URL}Signup`, payload)
      if (response.status === 201) {
        toast.success('User successfully registered!', {
          onClose: () => {
            setIsLoading(false)
            resetForm();
            navigate('/login');
          }
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  const mainStyle = {
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    minHeight: '100vh',
    paddingTop: '3rem',
  }
  const ErrorMessageRed = styled(ErrorMessage)`color: red`
  return (
    <Box style={mainStyle}>
      <ToastContainer autoClose={2000}/>
      <PageLoader isLoading={isLoading}/>
      <Container fixed sx={{padding: '0 1.5rem'}}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form style={{backgroundColor: 'rgba(255,255,255,0.8)', padding: '3rem'}}>
            <Box display={'flex'} alignSelf={'center'} justifyContent={'center'}>
              <img src={book} alt={"book"} className={"mw-100 h-auto"}/>
              <h4 className={"fw-bold text-center text-white"}>User Register</h4>
              <img src={book} alt={"book"} className={"mw-100 h-auto"}/>
            </Box>
            <Box sx={{my: 3}}>
              <Field as={TextField} fullWidth label={'Name'} className={'form-control'} type={'text'} name={'name'}
                     placeholder={'Enter Name'}/>
              <ErrorMessageRed component={'div'} name={'name'}/>
            </Box>
            <Box sx={{my: 3}}>
              <Field as={TextField} fullWidth label={'User Name'} className={'form-control'} type={'text'}
                     name={'userName'}
                     placeholder={'Enter User Name'}/>
              <ErrorMessageRed component={'div'} name={'userName'}/>
            </Box>
            <Box sx={{my: 3}}>
              <Field as={TextField} fullWidth label={'Email'} className={'form-control'} type={'email'} name={'email'}
                     placeholder={'Enter Email'}/>
              <ErrorMessageRed component={'div'} name={'email'}/>
            </Box>
            <Box sx={{my: 3}}>
              <Field as={TextField} fullWidth label={'Password'} className={'form-control'} type={'password'}
                     name={'password'}
                     placeholder={'Enter Password'}/>
              <ErrorMessageRed component={'div'} name={'password'}/>
            </Box>
            <Box sx={{my: 3}}>
              <Field as={TextField} fullWidth label={'Confirm Passowrd'} className={'form-control'} type={'password'}
                     name={'confirmPassword'}
                     placeholder={'Confirm Password'}/>
              <ErrorMessageRed component={'div'} name={'confirmPassword'}/>
            </Box>
            <Button variant='contained' type={'submit'}>Submit</Button>
          </Form>
        </Formik>
      </Container>
    </Box>
  );
}

export default Register;