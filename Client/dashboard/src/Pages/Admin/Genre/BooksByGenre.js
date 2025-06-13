import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import api from "../../../ApiHandle/api";
import {Card, CardBody, CardImg, CardSubtitle, CardTitle, Col, Container, Row} from "reactstrap";
import PageLoader from "../../../Components/PageLoader";

const BooksByGenre = () => {
  const {genre} = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get(`http://localhost:5000/api/book/GetBooksByGenre/${genre}`, {skipAuth: true}).then((res) => {
      setData(res.data);
      setLoading(false);
    })
  }, [])
  return (
    <Container fluid className={'py-4'}>
      <h4 className={'text-center mb-3'}>{data && data[0]?.genre?.name}</h4>
      <Row className="g-3">
        <PageLoader isLoading={loading}/>
        {data && data?.length > 0 ?
          data?.map((book, index) => (
            <Col md={4} sm={6} key={index}>
              <Link className={'text-decoration-none'} to={`/book/${book._id}`}>
                <Card>
                  <CardImg style={{height: '450px'}} className={"w-100"} top src={`http://localhost:5000${book.image}`}
                           alt={book.title}/>
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
              </Link>
            </Col>
          ))
          :
          <h5 className={'text-center'}>No Book Found in this Category</h5>
        }
      </Row>
    </Container>
  );
};

export default BooksByGenre;