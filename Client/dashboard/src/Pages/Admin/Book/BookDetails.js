import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PageLoader from "../../../Components/PageLoader";
import api from "../../../ApiHandle/api";
import {Button, Card, CardBody, Col, Container, Row} from "reactstrap";

const BookDetails = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`http://localhost:5000/api/book/GetById/${id}`, {skipAuth: true}).then((response) => {
      setLoading(false);
      setData(response?.data);
    }).catch((err) => {
      setLoading(false);
      console.log(err);
    });
  }, [id]);
  return (
    <div>
      <PageLoader isLoading={loading}/>
      <Container fluid>
        <Row className={'mt-5'}>
          <Col lg={4} md={6}>
            <img src={'http://localhost:5000' + data?.image} alt={'BookImage'} className={'mw-100 h-auto'}/>
          </Col>
          <Col lg={8} md={6}>
            <Card>
              <CardBody>
                <h3>{data?.title}</h3>
                <h5><span className="fw-normal">By: </span> {data?.author}</h5>
                <div dangerouslySetInnerHTML={{__html: data?.description}}/>
                <h6>Rs 3,000</h6>
                <h6>Available: {data?.quantity <= 0 ? 'Out of Stock' : data?.quantity}</h6>
                <Button disabled={data?.quantity <= 0} className={'me-3'} color={'primary'}>Add to Cart</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BookDetails;