import React, {useState} from 'react';
import {toast, ToastContainer} from "react-toastify";
import PageLoader from "../../../Components/PageLoader";
import {Button, Container} from "reactstrap";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import api from "../../../ApiHandle/api";

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
      const response = await api.post('http://localhost:5000/api/adminSignup', payload)
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
  return (
    <div>
      <ToastContainer autoClose={2000}/>
      <PageLoader isLoading={isLoading}/>
      <Container>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <h5 className="py-3">Add a new Admin</h5>
            <div className="mb-3">
              <Field className={'form-control'} type={'text'} name={'name'} placeholder={'Enter Name'}/>
              <ErrorMessage className={'text-danger'} component={'div'} name={'name'}/>
            </div>
            <div className={'mb-3'}>
              <Field className={'form-control'} type={'text'} name={'userName'} placeholder={'Enter User Name'}/>
              <ErrorMessage className={'text-danger'} component={'div'} name={'userName'}/>
            </div>
            <div className={'mb-3'}>
              <Field className={'form-control'} type={'email'} name={'email'} placeholder={'Enter Email'}/>
              <ErrorMessage className={'text-danger'} component={'div'} name={'email'}/>
            </div>
            <div className={'mb-3'}>
              <Field className={'form-control'} type={'password'} name={'password'} placeholder={'Enter Password'}/>
              <ErrorMessage className={'text-danger'} component={'div'} name={'password'}/>
            </div>
            <div className={'mb-3'}>
              <Field className={'form-control'} type={'password'} name={'confirmPassword'}
                     placeholder={'Confirm Password'}/>
              <ErrorMessage className={'text-danger'} component={'div'} name={'confirmPassword'}/>
            </div>
            <Button color={'primary'} type={'submit'}>Submit</Button>
          </Form>
        </Formik>
      </Container>
    </div>
  );
};

export default Add;