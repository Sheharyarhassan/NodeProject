import React, {useEffect, useState} from 'react';
import api from "../../../ApiHandle/api";
import PageLoader from "../../../Components/PageLoader";
import {
  Container,
  Pagination,
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
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  useEffect(() => {
    api.get(`http://localhost:5000/api/users/getAll?type=admin&page=${currentPage}&limit=${limit}`).then((res) => {
      setUsers(res.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    });
  }, [currentPage]);
  const StyledTableRow = styled(TableRow)(({theme}) => ({
    ['&:nth-type-of(odd)']: {
      backgroundColor: theme.palette.action.hover,
    },
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
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  }
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
            {users?.userNames?.map((user, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{user.name}</StyledTableCell>
                <StyledTableCell>{user.userName}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination sx={{mt: 2}} color='primary' onChange={handlePageChange} count={users.totalPages}/>
      </Container>
    </div>
  );
};

export default Index;