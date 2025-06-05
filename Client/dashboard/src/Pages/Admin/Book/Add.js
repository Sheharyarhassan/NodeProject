import React, {useEffect, useState} from 'react';
import {Button, Container, Input, Label} from "reactstrap";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import api from "../../../ApiHandle/api";
import PageLoader from "../../../Components/PageLoader";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";

function Add() {
  const [genre, setGenre] = useState([]);
  const [loading, setLoading] = useState(false);
  const adminToken = JSON.parse(localStorage.getItem("adminToken"));
  const navigate = useNavigate();

  const initialValues = {
    title: '',
    author: '',
    image: null,
    publishedYear: '',
    genre: ''
  }
  const validationSchema = Yup.object({
    title: Yup.string().required('Title cannot be empty'),
    author: Yup.string().required('Author cannot be empty'),
    image: Yup.mixed(),
    publishedYear: Yup.number(),
    genre: Yup.string().required('Genres cannot be empty'),
  })
  const handleSubmit = async (values, {resetForm}) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("author", values.author);
    if (values && values?.image || values.image !== '') {
      formData.append("image", values.image);
    }
    if (values && values?.publishedYear || values.publishedYear !== '') {
      formData.append("publishedYear", values.publishedYear);
    }
    formData.append("genre", values.genre);

    try {
      const response = await api.post("http://localhost:5000/api/book/Add", formData,
        {"Content-Type": "multipart/form-data"})
      console.log(response)
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
    <div>
      <ToastContainer autoClose={2000}/>
      <PageLoader isLoading={loading}/>
      <Container className="mt-5">
        <h5>Add a new Book</h5>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {(({setFieldValue}) =>
              <Form>
                <div className={"mt-3"}>
                  <Label>Book Title</Label>
                  <Field className="form-control" type={"text"} name="title"/>
                  <ErrorMessage name="title" component="div" className="text-danger"/>
                </div>
                <div className={"mt-3"}>
                  <Label>Author Name</Label>
                  <Field className="form-control mb-3" type={"text"} name="author"/>
                  <ErrorMessage name="author" component="div" className="text-danger"/>

                </div>
                <div className={"mt-3"}>
                  <Label>Select a Genre</Label>

                  <Field className="form-control mb-3" as="select" name="genre">
                    <option value="">Select a Genre</option>
                    {genre.map((item, index) => (
                      <option value={item._id} key={index}>{item.name}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="genre" component="div" className="text-danger"/>

                </div>
                <div className={"mt-3"}>
                  <Label>Published Year</Label>
                  <Field className="form-control mb-3" type={"number"} name="publishedYear"/>
                  <ErrorMessage name="publishedYear" component="div" className="text-danger"/>
                </div>
                <div className={"mt-3"}>
                  <Label>Upload Book Image</Label>
                  <Input
                    className="form-control"
                    type="file"
                    name="image"
                    onChange={(event) => setFieldValue("image", event.currentTarget.files[0])}
                  />
                  <ErrorMessage name="image" component="div" className="text-danger"/>

                </div>
                <Button className={"mt-4"} color={"primary"} type={"submit"}>Add Book</Button>
              </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
}

export default Add;