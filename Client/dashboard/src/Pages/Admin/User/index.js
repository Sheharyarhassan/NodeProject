import React, {useEffect, useState} from 'react';
import api from "../../../ApiHandle/api";
import PageLoader from "../../../Components/PageLoader";
import {Table} from "reactstrap";
import {Link} from "react-router-dom";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api.get('http://localhost:5000/api/users/getAll?type=user').then((res) => {
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
      <Table>
        <thead>
        <tr>
          <td>Name</td>
          <td>User Name</td>
          <td>Email Address</td>
          <td>Action</td>
        </tr>
        </thead>
        <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.name}</td>
            <td>{user.userName}</td>
            <td>{user.email}</td>
            <td><Link to={`/user/update/${user.id}`}><i className={'bx bx-pencil'}></i></Link></td>
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Index;