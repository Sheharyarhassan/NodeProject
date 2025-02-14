import React, {useEffect, useState} from 'react'
import {Card, CardBody, CardImg, CardSubtitle, CardTitle, Col, Container, Row} from "reactstrap";
import Skeleton from "react-loading-skeleton";
import api from "../ApiHandle/api";
const Home = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    api.get("http://localhost:5000/api/book/getAllActive",{skipAuth:true}).then((response) => {
      setBooks(response.data);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    })
  },[])
  return (
     <Container fluid>
       <Row className="justify-content-evenly gy-3 mt-5">
         {loading
            ? [...Array(8)].map((_, index) => (
               <Col key={index} lg={3} md={6} sm={12}>
                 <Card>
                   <Skeleton height={250} />
                   <CardBody>
                     <CardTitle>
                       <Skeleton width="80%" />
                     </CardTitle>
                     <CardSubtitle>
                       <Skeleton width="60%" />
                     </CardSubtitle>
                   </CardBody>
                 </Card>
               </Col>
            ))
            : books.map((book,index) => (
               <Col key={index} lg={3} md={6} sm={12}>
                 <Card >
                   <CardImg style={{ height: '450px'}} className={"w-100"} top src={`http://localhost:5000${book.image}`} alt={book.title} />
                   <CardBody className={"d-flex justify-content-between"}>
                     <div>
                     <CardTitle className={"fw-bold"} tag="h5">{book.title}</CardTitle>
                     <CardSubtitle tag="h6" className="text-muted">
                       {book.author}
                     </CardSubtitle>
                     </div>
                     <div>
                       <CardSubtitle className="small text-muted">
                         {book.genre.name}
                       </CardSubtitle>
                     </div>
                   </CardBody>
                 </Card>
               </Col>
            ))}
       </Row>
     </Container>
  );
}

export default Home