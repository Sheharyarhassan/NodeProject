import React, {useEffect, useState} from 'react';
import api from "../../../ApiHandle/api";
import {useNavigate, useParams} from "react-router-dom";
import PageLoader from "../../../Components/PageLoader";
import {toast, ToastContainer} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import QuillEditor from "../../../Components/QuillEditor";
import {Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";

const Update = () => {
  const [genre, setGenre] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get(`${process.env.REACT_APP_BASE_URL}book/GetById/${id}`, {skipAuth: true}).then((response) => {
      setBook(response?.data);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    })
  }, [id])
  const initialValues = {
    title: book?.title || '',
    author: book?.author || '',
    image: null,
    publishedYear: book?.publishedYear || '',
    genre: book?.genre?._id || '',
    quantity: book?.quantity || 0,
    description: book?.description || '',
  }
  const validationSchema = Yup.object({
    title: Yup.string().required('Title cannot be empty'),
    author: Yup.string().required('Author cannot be empty'),
    image: Yup.mixed().nullable(),
    publishedYear: Yup.number(),
    genre: Yup.string().required('Genres cannot be empty'),
    quantity: Yup.number().min(0).required('Quantity cannot be empty'),
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
    try {
      const response = await api.put(`${process.env.REACT_APP_BASE_URL}book/Update/${id}`, formData,
        {isAdmin: true, "Content-Type": "multipart/form-data"})
      console.log(response)
      if (response.status === 200) {
        resetForm();
        setLoading(false);
        toast.success("Book Successfully updated!",
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
      await api.get(`${process.env.REACT_APP_BASE_URL}genre/getAllActive`, {skipAuth: true}).then(
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
        <Typography component={'h1'} variant={'h5'}>Update Book</Typography>
        <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema}
                onSubmit={handleSubmit}>
          {(({setFieldValue}) =>
              <Form>
                <Box sx={{marginTop: '1.5rem'}}>
                  <Field as={TextField} label={'Book Title'} fullWidth type={"text"} name="title"
                         placeholder={'Enter Book Title'}/>
                  <ErrorMessage name="title" component="div" className="text-danger"/>
                </Box>
                <Box sx={{marginTop: '1.5rem'}}>
                  <Field as={TextField} label={'Author Name'} fullWidth type={"text"}
                         name="author"
                         placeholder={'Enter Author Name'}/>
                  <ErrorMessage name="author" component="div" className="text-danger"/>

                </Box>
                <Box sx={{marginTop: '1.5rem'}}>
                  <Field name="description" component={QuillEditor}/>
                  <ErrorMessage name="description" component="div" className="text-danger"/>
                </Box>
                <Box sx={{marginTop: '1.5rem'}}>
                  <FormControl fullWidth>
                    <InputLabel>
                      Select a Genre
                    </InputLabel>
                    <Field as={Select} label={'Select a Genre'} fullWidth name="genre">
                      {genre.map((item, index) => (
                        <MenuItem value={item._id} key={index}>{item.name}</MenuItem>
                      ))}
                    </Field>
                  </FormControl>

                  <ErrorMessage name="genre" component="div" className="text-danger"/>

                </Box>
                <Box sx={{marginTop: '1.5rem'}}>
                  <Field as={TextField} label={'Published Year'} fullWidth type={"number"}
                         name="publishedYear"
                         placeholder={'Enter Published Year'}/>
                  <ErrorMessage name="publishedYear" component="div" className="text-danger"/>
                </Box>
                <Box sx={{marginTop: '1.5rem'}}>
                  <Field as={TextField} label={'Book Quantity'} fullWidth min={0} type={"number"}
                         name="quantity"
                         placeholder={'Enter Book Quantity'}/>
                  <ErrorMessage name="quantity" component="div" className="text-danger"/>
                </Box>
                <Box sx={{marginTop: '1.5rem'}}>
                  <InputLabel>Book Image</InputLabel>
                  <img src={`${process.env.REACT_APP_IMAGE_PATH}${book.image}`} alt={"book"} className={"mw-100 h-auto"}/>
                </Box>
                <Box sx={{marginTop: '1.5rem'}}>
                  <InputLabel>Update Book Image</InputLabel>
                  <input
                    className="form-control"
                    type="file"
                    name="image"
                    onChange={(event) => setFieldValue("image", event.currentTarget.files[0])}
                  />
                  <ErrorMessage name="image" component="div" className="text-danger"/>

                </Box>
                <Button sx={{marginTop: '1.5rem'}} variant="contained" type={"submit"}>Update Book</Button>
              </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default Update;