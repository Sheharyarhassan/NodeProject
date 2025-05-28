import React, {useEffect, useState} from 'react';
import api from "../../../ApiHandle/api";
import {useNavigate, useParams} from "react-router-dom";
import PageLoader from "../../../Components/PageLoader";
import {toast, ToastContainer} from "react-toastify";
import {Button, Container, Input, Label} from "reactstrap";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

const Update = () => {
  const [genre, setGenre] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get(`http://localhost:5000/api/book/GetById/${id}`, {skipAuth: true}).then((response) => {
      setBook(response?.data);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    })
  }, [])
  const initialValues = {
    title: book && book?.title || '',
    author: book && book?.author || '',
    image: null,
    publishedYear: book && book?.publishedYear || '',
    genre: book && book?.genre?._id || ''
  }
  const validationSchema = Yup.object({
    title: Yup.string().required('Title cannot be empty'),
    author: Yup.string().required('Author cannot be empty'),
    image: Yup.mixed().nullable(),
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
      const response = await api.put(`http://localhost:5000/api/book/Update/${id}`, formData,
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
        <h5>Update Book</h5>
        <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema}
                onSubmit={handleSubmit}>
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
                  <Label>Current Image</Label><br/>
                  <img src={`http://localhost:5000${book.image}`} alt={"book"} className={"mw-100 h-auto"}/>
                </div>
                <div className={"mt-3"}>
                  <Label>Update Book Image</Label>
                  <Input
                    className="form-control"
                    type="file"
                    name="image"
                    onChange={(event) => setFieldValue("image", event.currentTarget.files[0])}
                  />
                  <ErrorMessage name="image" component="div" className="text-danger"/>

                </div>
                <Button className={"mt-4"} color={"primary"} type={"submit"}>Update Book</Button>
              </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default Update;