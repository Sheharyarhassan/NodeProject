import React, {useEffect, useState} from 'react';
import api from '../../../ApiHandle/api'
import PageLoader from "../../../Components/PageLoader";
import {
  Chip,
  Container,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate} from "react-router-dom";

function Index() {
  const navigate = useNavigate();
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
                  <IconButton
                    onClick={() => updateStatus(true, item._id)}>
                    <DeleteIcon sx={{color: 'red'}} fontSize='small'/>
                  </IconButton> :
                  <IconButton
                    onClick={() => updateStatus(false, item._id)}>
                    <CheckIcon color="success" fontSize='small'/>
                  </IconButton>}
                  <IconButton onClick={() => navigate(`/book/update/${item._id}`)}>
                    <EditIcon color='primary' fontSize='small'/>
                  </IconButton>
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