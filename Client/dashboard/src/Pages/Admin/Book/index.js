import React, {useEffect, useState} from 'react';
import api from '../../../ApiHandle/api'
import PageLoader from "../../../Components/PageLoader";
import {Link} from "react-router-dom";
import {
  Chip,
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

function Index() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('http://localhost:5000/api/book/GetAll', {}, {isAdmin: true});
      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  const updateStatus = async (active, id) => {
    setLoading(true);
    try {
      await api.patch(`http://localhost:5000/api/book/${active ? 'Deactivate' : 'Activate'}/${id}`, {},
        {isAdmin: true})
      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, [])
  const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  return (
    <div>
      <PageLoader isLoading={loading}/>
      <Container fluid sx={{padding: '1.5rem'}}>
        <Typography sx={{margin: '2rem 0'}} component='h1' variant='h5'>
          Book Details
        </Typography>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Author</StyledTableCell>
              <StyledTableCell>Published Year</StyledTableCell>
              <StyledTableCell>Genre</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data && data.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{item.title}</StyledTableCell>
                <StyledTableCell>{item.author}</StyledTableCell>
                <StyledTableCell>{item.publishedYear}</StyledTableCell>
                <StyledTableCell>{item.genre.name}</StyledTableCell>
                <StyledTableCell>{item.validFlag ?
                  <Chip label="Active" color="primary"/> :
                  <Chip label="Disabled" color="success"/>}
                </StyledTableCell>
                <StyledTableCell>{item.validFlag ?
                  <i className={'bx bx-trash text-danger'} role={'button'}
                     onClick={() => updateStatus(true, item._id)}></i> :
                  <i className={'bx bx-check text-success'} role={'button'}
                     onClick={() => updateStatus(false, item._id)}></i>}
                  <Link to={`/book/update/${item._id}`}><i className={'bx bx-pencil text-primary'}></i></Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </div>
  );
}

export default Index;