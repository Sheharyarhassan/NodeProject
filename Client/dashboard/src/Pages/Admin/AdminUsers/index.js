import React, {useEffect, useState} from 'react';
import api from "../../../ApiHandle/api";
import PageLoader from "../../../Components/PageLoader";
import {
  Container,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";

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
  const StyledTableRow = styled(TableRow)(({theme}) => ({
    ['&:nth-type-of(odd)']: {
      backgroundColor: theme.palette.action.hover,
    },
    ['&:last-child td, &:last-child th']: {
      border: 0
    }
  }))
  const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: '14px'
    }
  }))
  return (
    <div>
      <PageLoader isLoading={loading}/>
      <Container fluid sx={{padding: '1.5rem'}}>
        <Typography sx={{margin: '2rem 0'}} component='h1' variant='h5'>
          Admin Details
        </Typography>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>User Name</StyledTableCell>
              <StyledTableCell>Email Address</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{user.name}</StyledTableCell>
                <StyledTableCell>{user.userName}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </div>
  );
};

export default Index;