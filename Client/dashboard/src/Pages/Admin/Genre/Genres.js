import React, {useEffect, useState} from 'react';
import {Card, CardBody, Col, Container, Row} from "reactstrap";
import bgCard from '../../../Assets/Images/login-bg.png'
import api from "../../../ApiHandle/api";
import PageLoader from "../../../Components/PageLoader";
import {Link} from "react-router-dom";

const Genres = () => {
  const [loading, setLoading] = useState(true);
  const bgStyle = {
    backgroundImage: `url(${bgCard})`,
    backgroundSize: "cover",
    minHeight: "250px",
    height: '100%',
  }
  const [data, setData] = useState(null);
  useEffect(() => {
    api.get('http://localhost:5000/api/genre/getAllActive', {skipAuth: true}).then(res => {
      setData(res.data);
      setLoading(false)
    })
  }, [])
  return (
    <Container>
      <h3>Categories</h3>
      <PageLoader isLoading={loading}/>
      <Row className={'g-3'}>
        {data && data.length > 0 ?
          data.map((genre, index) => (
            <Col md={4} sm={6} key={index}>
              <Link className={'text-decoration-none'} to={`/genres/${genre?._id}`}>
                <Card style={bgStyle}>
                  <CardBody className={'d-flex align-items-center justify-content-center'}>
                    <h5 className={'text-light'}>{genre?.name}</h5>
                  </CardBody>
                </Card>
              </Link>
            </Col>
          ))
          :
          <h5>No Categories Found</h5>
        }

      </Row>
    </Container>
  );
};

export default Genres;