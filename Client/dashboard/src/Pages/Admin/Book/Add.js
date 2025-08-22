import React, {useEffect, useState} from 'react';
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import api from "../../../ApiHandle/api";
import PageLoader from "../../../Components/PageLoader";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import QuillEditor from "../../../Components/QuillEditor";
import {Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";

function Add() {
  const [genre, setGenre] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    title: '',
    author: '',
    image: null,
    publishedYear: '',
    genre: '',
    quantity: 0,
    description: ''
  }
  const validationSchema = Yup.object({
    title: Yup.string().required('Title cannot be empty'),
    author: Yup.string().required('Author cannot be empty'),
    image: Yup.mixed(),
    publishedYear: Yup.number(),
    genre: Yup.string().required('Genres cannot be empty'),
    quantity: Yup.number().min(0).required(),
    description: Yup.string().required('Description cannot be empty'),
  })
  const handleSubmit = async (values, {resetForm}) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("author", values.author);
    if (values?.image || values.image !== '') {
      formData.append("image", values.image);
    }
    if (values?.publishedYear || values.publishedYear !== '') {
      formData.append("publishedYear", values.publishedYear);
    }
    formData.append("genre", values.genre);
    formData.append("quantity", values.quantity);
    formData.append("description", values.description);
    setLoading(true);
    try {
      const response = await api.post("http://localhost:5000/api/book/Add", formData,
        {"Content-Type": "multipart/form-data"})
      if (response.status === 201) {
        resetForm();
        setLoading(false);
        toast.success("Book Successfully added!",
          {onClose: () => navigate("/book")});
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  const populateGenres = async () => {
    setLoading(true);
    try {
      await api.get('http://localhost:5000/api/genre/getAllActive', {skipAuth: true}).then(
        (response) => {
          setGenre(response.data);
          setLoading(false);
        }).catch(error => {
        console.log(error);
        setLoading(false)
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  useEffect(() => {
    populateGenres()
  }, []);
  return (
    <Box>
      <ToastContainer autoClose={2000}/>
      <PageLoader isLoading={loading}/>
      <Container fixed sx={{padding: '1.5rem'}}>
        <Typography component={'h1'} variant={'h5'}>Add a new Book</Typography>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {(
            ({setFieldValue}) =>
              <Form>
                <Box sx={{marginTop: '1rem'}}>
                  {/*<Label>Book Title</Label>*/}
                  <Field as={TextField} fullWidth label={'Book Title'} className="form-control" type={"text"}
                         name="title"
                         placeholder={'Enter Book Title'}/>
                  <ErrorMessage name="title" component={Typography} sx={{color: 'red'}}/>
                </Box>
                <Box sx={{marginTop: '1rem'}}>
                  {/*<Label>Author Name</Label>*/}
                  <Field as={TextField} fullWidth label={'Author Name'} className="form-control mb-3" type={"text"}
                         name="author"
                         placeholder={'Enter Author Name'}/>
                  <ErrorMessage name="author" component={Typography} sx={{color: 'red'}}/>

                </Box>
                <Box sx={{marginTop: '1rem'}}>
                  {/*<Label>Book Description</Label>*/}
                  <Field as={TextField} fullWidth label={'Book Description'} name="description"
                         component={QuillEditor}/>
                  <ErrorMessage name="description" component={Typography} sx={{color: 'red'}}/>
                </Box>

                <Box sx={{marginTop: '1rem'}}>
                  {/*<Label>Select a Genre</Label>*/}
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select a Genre</InputLabel>
                    <Field as={Select} label={'Select a Genre'} name="genre">
                      {genre.map((item, index) => (
                        <MenuItem value={item._id} key={index}>{item.name}</MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                  <ErrorMessage name="genre" component={Typography} sx={{color: 'red'}}/>
                </Box>
                <Box sx={{marginTop: '1rem'}}>
                  {/*<Label>Published Year</Label>*/}
                  <Field as={TextField} fullWidth label={'Published Year'} className="form-control mb-3" type={"number"}
                         name="publishedYear"
                         placeholder={'Enter Published Year'}/>
                  <ErrorMessage name="publishedYear" component={Typography} sx={{color: 'red'}}/>
                </Box>
                <Box sx={{marginTop: '1rem'}}>
                  {/*<Label>Book Quantity</Label>*/}
                  <Field as={TextField} fullWidth label={'Book Quantity'} className="form-control" min={0}
                         type={"number"}
                         name="quantity"
                         placeholder={'Enter Book Quantity'}/>
                  <ErrorMessage name="quantity" component={Typography} sx={{color: 'red'}}/>
                </Box>
                <Box sx={{marginTop: '1rem'}}>
                  <InputLabel sx={{marginBottom: '0.5rem'}}>Upload Book Image</InputLabel>
                  <input
                    className="form-control"
                    type="file"
                    name="image"
                    onChange={(event) => setFieldValue("image", event.currentTarget.files[0])}
                  />
                  <ErrorMessage name="image" component={Typography} sx={{color: 'red'}}/>

                </Box>
                <Button sx={{marginTop: '1rem'}} variant="contained" type={"submit"}>Add Book</Button>
              </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
}

export default Add;