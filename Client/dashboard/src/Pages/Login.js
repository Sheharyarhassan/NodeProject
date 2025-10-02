import React, {useState} from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import {ErrorMessage, Field, Form as FormikForm, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import PageLoader from "../Components/PageLoader";
import {toast, ToastContainer} from 'react-toastify';
import background from '../Assets/Images/Login_Bg.jpg';
import book from '../Assets/Images/Book2.png';
import {Box, Button, Container, TextField, Typography} from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    userName: '',
    password: '',
  }
  const validationSchema = Yup.object({
    userName: Yup.string().required('User Name cannot be empty'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required(),
  })
  const handleSubmit = async (values, {resetForm}) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.BASE_URL}login`, values, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (response && response.status === 200) {
        resetForm();
        setIsLoading(false);
        localStorage.setItem('token', JSON.stringify(response.data.accessToken))
        localStorage.setItem('userType', JSON.stringify(response.data.userTypeName))
        localStorage.setItem('userDetails', JSON.stringify(response.data.userDetails))
        toast.success("Login Successful!", {
          onClose: () => {
            window.dispatchEvent(new Event("authChange"));
            navigate('/');
          }
        });

      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data || error.message);
      console.log("Error:", error);
    }
  }
  const mainStyle = {
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    minHeight: '100vh',
    paddingTop: '3rem'
  }
  return (
    <Box style={mainStyle}>
      <ToastContainer autoClose={2000}/>
      <PageLoader isLoading={isLoading}/>
      <Container fixed sx={{padding: '0 1.5rem'}}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({handleSubmit}) => (
            <FormikForm style={{backgroundColor: 'rgba(255,255,255,0.6)', padding: '2rem', borderRadius: '10px'}}
                        onSubmit={handleSubmit}>
              <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img src={book} alt={"book"} className={"mw-100 h-auto"}/>
                <h4 className={"fw-bold text-center text-white"}>User Login</h4>
                <img src={book} alt={"book"} className={"mw-100 h-auto"}/>
              </Box>
              <Box sx={{marginTop: '1rem'}}>
                {/*<TextField id="outlined-basic" label="Outlined" variant="outlined" />*/}
                {/*<Label className={"text-white"}>User Name</Label><br/>*/}
                <Field as={TextField} fullWidth label="User Name" className="form-control"
                       name="userName"
                       type="text"/>
                <ErrorMessage name="userName" component="div" className="text-danger"/>
              </Box>

              <Box sx={{marginTop: '1rem'}}>
                {/*<Label className={"text-white"}>Password</Label><br/>*/}
                <Field as={TextField} fullWidth label="Password" className="form-control" name="password"
                       type="password"/>
                <ErrorMessage name="password" component="div" className="text-danger"/>
              </Box>

              <Box sx={{margin: '1rem auto'}}>
                <Button type="submit" variant='contained'>Login</Button>
              </Box>
              <Typography component='p'>New User? Click <Link to={'/register'}>Here</Link> to
                Register</Typography>
            </FormikForm>
          )}
        </Formik>
      </Container>
    </Box>
  );
}

export default Login;