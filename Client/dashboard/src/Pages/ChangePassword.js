import React, {useState} from 'react';
import * as Yup from "yup";
import api from "../ApiHandle/api";
import {ErrorMessage, Field, Form, Formik} from "formik";
import PageLoader from "../Components/PageLoader";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {Box, Button, Container, TextField} from "@mui/material";

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const storedUser = localStorage.getItem("userDetails") && JSON.parse(localStorage.getItem("userDetails"));
  const initialValues = {
    userName: storedUser.userName,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  const validationSchema = Yup.object({
    oldPassword: Yup.string().required('Enter Old password'),
    newPassword: Yup.string()
      .required('New Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[@$!%*?&]/, 'Password must contain at least one special character'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Please confirm your password'),
  })
  const navigate = useNavigate();
  const handleSubmit = async (values, {resetForm}) => {
    setIsLoading(true);
    const {confirmPassword, ...payload} = values;
    try {
      const response = await api.put(`${process.env.REACT_APP_BASE_URL}user/changePassword`, payload)
      console.log(response.status)
      if (response.status === 200) {
        toast.success(response.data || 'Password Changed Successfully!', {
          onClose: () => {
            setIsLoading(false)
            resetForm();
            navigate('/logout');
          }
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
  return (
    <Container fixed className={'py-4'}>
      <h5 className={'mb-3'}>Change Password</h5>
      <PageLoader isLoading={isLoading}/>
      <ToastContainer autoClose={2000}/>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <Box sx={{mb: 2}}>
            <Field as={TextField} fullWidth name={'oldPassword'} type={'password'}
                   placeholder={'Enter Old password'}/>
            <ErrorMessage className={'text-danger'} name={'oldPassword'} component={'div'}/>
          </Box>
          <Box sx={{mb: 2}}>
            <Field as={TextField} fullWidth name={'newPassword'} type={'password'}
                   placeholder={'Enter New password'}/>
            <ErrorMessage className={'text-danger'} name={'newPassword'} component={'div'}/>
          </Box>
          <Box sx={{mb: 2}}>
            <Field as={TextField} fullWidth name={'confirmPassword'} type={'password'}
                   placeholder={'Confirm password'}/>
            <ErrorMessage className={'text-danger'} name={'confirmPassword'} component={'div'}/>
          </Box>
          <Box sx={{mb: 2}}>
            <Button variant='contained' type={'submit'}>Submit</Button>
          </Box>
        </Form>
      </Formik>
    </Container>
  );
};

export default ChangePassword;