import React, {useEffect, useState} from 'react';
import api from "../../../ApiHandle/api";
import PageLoader from "../../../Components/PageLoader";
import {Container, Table} from "reactstrap";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api.get('http://localhost:5000/api/users/getAll?type=admin').then((res) => {
      setUsers(res.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      <PageLoader isLoading={loading}/>
      <Container fluid>
        <Table>
          <thead>
          <tr>
            <td>Name</td>
            <td>User Name</td>
            <td>Email Address</td>
          </tr>
          </thead>
          <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
            </tr>
          ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Index;