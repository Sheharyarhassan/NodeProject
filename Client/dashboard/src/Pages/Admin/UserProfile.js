import React, {useEffect, useState} from 'react';
import api from "../../ApiHandle/api";
import PageLoader from "../../Components/PageLoader";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {Button, Container} from "reactstrap";
import {ErrorMessage, Field, Form, Formik} from "formik";

const UserProfile = () => {
  const storedUser = localStorage.getItem("userDetails") && JSON.parse(localStorage.getItem("userDetails"));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get(`http://localhost:5000/api/user/getById/${storedUser.id}`).then((res) => {
      setData(res.data);
      setLoading(false);
    })
  }, []);
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
    setLoading(true);
    const {confirmPassword, ...payload} = values;
    try {
      const response = await api.put(`http://localhost:5000/api/user/Update/${storedUser.id}`, payload)
      if (response.status === 200) {
        toast.success('User successfully updated!', {
          onClose: () => {
            setLoading(false)
            resetForm();
            navigate('/admin/view');
          }
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <div>
      <ToastContainer autoClose={2000}/>
      <PageLoader isLoading={loading}/>
      <Container className={'py-4'}>
        <h5 className={'mb-3'}>User Profile</h5>
        <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema}
                onSubmit={handleSubmit}>
          <Form>
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
            <Button color={'primary'} type={'submit'}>Submit</Button>
          </Form>
        </Formik>
      </Container>
    </div>
  );
};

export default UserProfile;