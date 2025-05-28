import React, {useState} from 'react';
import {Button, Container, Label} from "reactstrap";
import {ErrorMessage, Field, Form as FormikForm, Formik} from "formik";
import * as Yup from "yup";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import PageLoader from "../../../Components/PageLoader";

function Add() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    name: "",
  }
  const validationSchema = Yup.object({
    name: Yup.string().required("Genre Name is required")
  })
  const handleSubmit = async (values, {resetForm}) => {
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/api/genre/Add', values,)
      if (response.status === 201) {
        resetForm();
        setLoading(false);
        toast.success("Genre added successfully",
          {onClose: () => navigate('/genre')});
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }

  }
  return (
    <div>
      <ToastContainer autoClose={2000}/>
      <PageLoader isLoading={loading}/>
      <Container className={"mt-4"}>
        <h5>Add a new Genre</h5>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({handleSubmit}) => (
            <FormikForm onSubmit={handleSubmit}>
              <div className={'mb-3'}>
                <Label>Genre Name</Label>
                <Field className={"form-control"} name="name" type="text"/>
                <ErrorMessage name="name" component="div" className={"text-danger"}/>
              </div>
              <Button color={"primary"} type="submit">Add Genre</Button>
            </FormikForm>
          )}
        </Formik>
      </Container>
    </div>
  );
}

export default Add;