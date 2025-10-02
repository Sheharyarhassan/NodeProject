import React, {useEffect, useState} from 'react';
import api from "../../../ApiHandle/api";
import PageLoader from "../../../Components/PageLoader";
import {useNavigate} from "react-router-dom";
import {
  Box,
  Container,
  IconButton,
  Pagination,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    api.get(`${process.env.BASE_URL}users/getAll?type=user&page=${currentPage}&limit=${limit}`).then((res) => {
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
    ['&:last-child td,&:last-child th']: {
      border: 0
    }
  }));
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
    <Box variant={'section'}>
      <PageLoader isLoading={loading}/>
      <Container fixed sx={{padding: '1.5rem'}}>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>User Name</StyledTableCell>
              <StyledTableCell>Email Address</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {users?.userNames?.map((user, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{user.name}</StyledTableCell>
                <StyledTableCell>{user.userName}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>
                  <IconButton onClick={() => navigate(`/user/update/${user.id}`)}>
                    <EditIcon fontSize='small' color='primary'/>
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination sx={{mt: 2}} color='primary' count={users?.totalPages} onChange={handlePageChange}/>
      </Container>
    </Box>
  );
};

export default Index;