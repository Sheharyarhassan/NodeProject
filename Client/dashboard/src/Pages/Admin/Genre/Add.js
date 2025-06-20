import React, {useState} from 'react';
import {ErrorMessage, Field, Form as FormikForm, Formik} from "formik";
import * as Yup from "yup";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import PageLoader from "../../../Components/PageLoader";
import {Box, Button, Container, TextField} from "@mui/material";

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
    <Box>
      <ToastContainer autoClose={2000}/>
      <PageLoader isLoading={loading}/>
      <Container fixed sx={{padding: '1.5rem'}}>
        <h5>Add a new Genre</h5>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({handleSubmit}) => (
            <FormikForm onSubmit={handleSubmit}>
              <Box sx={{marginBottom: '1.5rem'}}>
                {/*<Label>Genre Name</Label>*/}
                <Field as={TextField} fullWidth label={'Genre Name'} className={"form-control"} name="name"
                       type="text"/>
                <ErrorMessage name="name" component="div" className={"text-danger"}/>
              </Box>
              <Button variant='contained' type="submit">Add Genre</Button>
            </FormikForm>
          )}
        </Formik>
      </Container>
    </Box>
  );
}

export default Add;