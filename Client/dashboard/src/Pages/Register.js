import React, {useState} from 'react';
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import background from "../Assets/Images/Login_Bg.jpg";
import {toast, ToastContainer} from "react-toastify";
import PageLoader from "../Components/PageLoader";
import book from "../Assets/Images/Book2.png";
import api from "../ApiHandle/api";
import {useNavigate} from "react-router-dom";
import {Button, Container, TextField} from "@mui/material";

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
      const response = await api.post('http://localhost:5000/api/Signup', payload)
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
  }
  return (
    <div style={mainStyle} className={'pt-5'}>
      <ToastContainer autoClose={2000}/>
      <PageLoader isLoading={isLoading}/>
      <Container fixed sx={{padding: '0 1.5rem'}}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form style={{backgroundColor: 'rgba(0,0,0,0.6)'}} className={"p-lg-5 p-3 rounded-3"}>
            <div className={"d-flex align-items-center justify-content-center"}>
              <img src={book} alt={"book"} className={"mw-100 h-auto"}/>
              <h4 className={"fw-bold text-center text-white"}>User Register</h4>
              <img src={book} alt={"book"} className={"mw-100 h-auto"}/>
            </div>
            <div className="my-3">
              <Field as={TextField} label={'Name'} className={'form-control'} type={'text'} name={'name'}
                     placeholder={'Enter Name'}/>
              <ErrorMessage className={'text-danger'} component={'div'} name={'name'}/>
            </div>
            <div className={'mb-3'}>
              <Field as={TextField} label={'User Name'} className={'form-control'} type={'text'} name={'userName'}
                     placeholder={'Enter User Name'}/>
              <ErrorMessage className={'text-danger'} component={'div'} name={'userName'}/>
            </div>
            <div className={'mb-3'}>
              <Field as={TextField} label={'Email'} className={'form-control'} type={'email'} name={'email'}
                     placeholder={'Enter Email'}/>
              <ErrorMessage className={'text-danger'} component={'div'} name={'email'}/>
            </div>
            <div className={'mb-3'}>
              <Field as={TextField} label={'Password'} className={'form-control'} type={'password'} name={'password'}
                     placeholder={'Enter Password'}/>
              <ErrorMessage className={'text-danger'} component={'div'} name={'password'}/>
            </div>
            <div className={'mb-3'}>
              <Field as={TextField} label={'Confirm Passowrd'} className={'form-control'} type={'password'}
                     name={'confirmPassword'}
                     placeholder={'Confirm Password'}/>
              <ErrorMessage className={'text-danger'} component={'div'} name={'confirmPassword'}/>
            </div>
            <Button variant='contained' type={'submit'}>Submit</Button>
          </Form>
        </Formik>
      </Container>
    </div>
  );
}

export default Register;