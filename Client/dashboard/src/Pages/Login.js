import React, {useState} from 'react';
import {Button, Container, Label} from "reactstrap";
import axios from 'axios';
import * as Yup from 'yup';
import {ErrorMessage, Field, Form as FormikForm, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import PageLoader from "../Components/PageLoader";
import {toast, ToastContainer} from 'react-toastify';
import background from '../Assets/Images/Login_Bg.jpg';
import book from '../Assets/Images/Book2.png';

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
      const response = await axios.post('http://localhost:5000/api/login', values, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (response && response.status === 200) {
        resetForm();
        setIsLoading(false);
        localStorage.setItem('token', JSON.stringify(response.data.accessToken))
        localStorage.setItem('userType', JSON.stringify(response.data.userTypeName))
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
  }
  return (
    <div style={mainStyle} className={"pt-5 "}>
      <ToastContainer autoClose={2000}/>
      <PageLoader isLoading={isLoading}/>
      <Container className={"px-lg-5"}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({handleSubmit}) => (
            <FormikForm style={{backgroundColor: 'rgba(0,0,0,0.6)'}} className={"p-lg-5 p-3 rounded-3"}
                        onSubmit={handleSubmit}>
              <div className={"d-flex align-items-center justify-content-center"}>
                <img src={book} alt={"book"} className={"mw-100 h-auto"}/>
                <h4 className={"fw-bold text-center text-white"}>User Login</h4>
                <img src={book} alt={"book"} className={"mw-100 h-auto"}/>
              </div>
              <div className={"mt-3"}>
                <Label className={"text-white"}>User Name</Label><br/>
                <Field className="form-control" name="userName" type="text"/>
                <ErrorMessage name="userName" component="div" className="text-danger"/>
              </div>

              <div className={"mt-3"}>
                <Label className={"text-white"}>Password</Label><br/>
                <Field className="form-control" name="password" type="password"/>
                <ErrorMessage name="password" component="div" className="text-danger"/>
              </div>

              <div className="mt-4">
                <Button type="submit" color="primary">Login</Button>
              </div>
              <p className={'text-white mt-3'}>New User? Click <Link to={'/register'}>Here</Link> to Register</p>
            </FormikForm>
          )}
        </Formik>
      </Container>
    </div>
  );
}

export default Login;