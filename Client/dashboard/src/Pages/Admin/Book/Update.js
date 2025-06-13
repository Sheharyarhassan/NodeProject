import React, {useEffect, useState} from 'react';
import api from "../../../ApiHandle/api";
import {useNavigate, useParams} from "react-router-dom";
import PageLoader from "../../../Components/PageLoader";
import {toast, ToastContainer} from "react-toastify";
import {Button, Container, Input, Label} from "reactstrap";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import QuillEditor from "../../../Components/QuillEditor";

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
    quantity: Yup.number().required('Quantity cannot be empty'),
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
      <Container className="py-5">
        <h5>Update Book</h5>
        <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema}
                onSubmit={handleSubmit}>
          {(({setFieldValue}) =>
              <Form>
                <div className={"mt-3"}>
                  <Label>Book Title</Label>
                  <Field className="form-control" type={"text"} name="title" placeholder={'Enter Book Title'}/>
                  <ErrorMessage name="title" component="div" className="text-danger"/>
                </div>
                <div className={"mt-3"}>
                  <Label>Author Name</Label>
                  <Field className="form-control mb-3" type={"text"} name="author" placeholder={'Enter Author Name'}/>
                  <ErrorMessage name="author" component="div" className="text-danger"/>

                </div>
                <div className={"mt-3"}>
                  <Label>Book Description</Label>
                  <Field name="description" component={QuillEditor}/>
                  <ErrorMessage name="description" component="div" className="text-danger"/>
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
                  <Field className="form-control mb-3" type={"number"} name="publishedYear"
                         placeholder={'Enter Published Year'}/>
                  <ErrorMessage name="publishedYear" component="div" className="text-danger"/>
                </div>
                <div className={"mt-3"}>
                  <Label>Book Quantity</Label>
                  <Field className="form-control" min={0} type={"number"} name="quantity"
                         placeholder={'Enter Book Quantity'}/>
                  <ErrorMessage name="quantity" component="div" className="text-danger"/>
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