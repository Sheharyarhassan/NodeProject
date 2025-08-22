import React, {useEffect, useState} from 'react';
import api from '../../../ApiHandle/api'
import PageLoader from "../../../Components/PageLoader";
import {
  Box,
  Chip,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
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
  const [perPage, setPerPage] = useState(10);
  const [filters, setFilters] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState({
    Genre: ['all'],
    Status: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('title');
  const [sort, setSort] = useState('asc');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    api.get('http://localhost:5000/api/book/getFilters').then(response => {
      setFilters(response?.data)
    });
  }, []);
  const handleChange = (event, value) => {
    setCurrentPage(value);
  }
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`http://localhost:5000/api/book/GetAll?page=${currentPage}&limit=${perPage}&title=${title}&sortOrder=${sort}`, {}, {isAdmin: true});
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
  }, [currentPage, title, sort])
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
  }));
  const handleSortChange = (event) => {
    const clickedHeader = event.target.textContent.trim().toLowerCase();
    const fieldMap = {
      'title': 'title',
      'author': 'author',
      'published year': 'publishedYear',
    };

    const field = fieldMap[clickedHeader];
    if (field) {
      setTitle(field);
      setSort(prev => (prev === 'asc' ? 'desc' : 'asc'));
    }
  }
  console.log(filters)
  return (
    <div>
      <PageLoader isLoading={loading}/>
      <Container fluid sx={{padding: '1.5rem'}}>
        <Typography sx={{margin: '2rem 0'}} component='h1' variant='h5'>
          Book Details
        </Typography>
        <Grid spacing={2}>
          {filters && filters?.map((items, index) => (
            <Grid key={index} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{items?.label}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  multiple={items?.type === 'multiple'}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
                  renderValue={
                    items?.type === 'multi'
                      ? (selected) => (
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                          {selected.map((value) => (
                            <Chip key={value} label={value}/>
                          ))}
                        </Box>
                      )
                      : undefined
                  }
                  value={items?.label === 'Genre' ? selectedGenre.Genre : selectedGenre.Status}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  label="Age"
                  variant={'outlined'}
                  sx={{mb: 4}}
                >
                  {items.options.map((option, index) => (
                    <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>

            </Grid>
          ))}

        </Grid>

        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell sx={{cursor: 'pointer'}} onClick={handleSortChange}>Title</StyledTableCell>
              <StyledTableCell sx={{cursor: 'pointer'}} onClick={handleSortChange}>Author</StyledTableCell>
              <StyledTableCell sx={{cursor: 'pointer'}} onClick={handleSortChange}>Published Year</StyledTableCell>
              <StyledTableCell>Genre</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data && data?.books?.map((item, index) => (
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
        <Pagination sx={{mt: 2}} count={data?.totalPages} page={currentPage} onChange={handleChange} color="primary"/>
      </Container>
    </div>
  );
}

export default Index;