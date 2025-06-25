import React, {useEffect, useState} from "react";
import PageLoader from "../../../Components/PageLoader";
import api from "../../../ApiHandle/api"
import {
  Chip,
  Container,
  IconButton,
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
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate} from "react-router-dom";

function Index() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate();
  const fetchData = async () => {
    setLoading(true);
    try {
      await api.get(`http://localhost:5000/api/genre/getAll?page=${currentPage}&limit=${limit}`).then(data => {
        setData(data.data)
      }).catch((err) => {
        console.log(err)
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const updateStatus = async (active, id) => {
    setLoading(true);
    try {
      await api.patch(`http://localhost:5000/api/genre/${active ? 'Deactivate' : 'Activate'}/${id}`
        , {}, {isAdmin: true})
      fetchData();
    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, [currentPage]);
  const StyledTableRow = styled(TableRow)(({theme}) => ({
    ['&:nth-of-type(odd)']: {
      backgroundColor: theme.palette.action.hover
    },
  }))
  const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }))
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  }
  return (
    <div>
      <PageLoader isLoading={loading}/>
      <Container fixed sx={{padding: '1.5rem'}}>
        <Typography sx={{margin: '2rem 0'}} component='h1' variant='h3'>
          Genre Details
        </Typography>
        <Table className="table table-striped">
          <TableHead className="thead-light">
            <StyledTableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell className={'text-center'}>Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data && data.genres?.length > 0 ? (
              data?.genres?.map((item, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{item.name}</StyledTableCell>
                  <StyledTableCell>
                    {item.validFlag ?
                      <Chip color="success" label={'Active'}/> :
                      <Chip sx={{backgroundColor: 'red', color: 'white'}} label={'Disabled'}/>
                    }
                  </StyledTableCell>
                  <StyledTableCell className={'text-center'}>{item.validFlag ?
                    <IconButton
                      aria-label="delete"
                      onClick={() => updateStatus(true, item._id)}
                      size="small"
                      sx={{color: 'red'}}
                    >
                      <DeleteIcon fontSize="small"/>
                    </IconButton>
                    : <IconButton
                      aria-label="check"
                      onClick={() => updateStatus(false, item._id)}
                      size="small"
                      color="success"
                    >
                      <CheckIcon fontSize='small'/>
                    </IconButton>
                  }<IconButton
                    aria-label="check"
                    size="small"
                    color="primary"
                    onClick={() => navigate(`/genre/${item._id}`)}
                  ><EditIcon fontSize="small"/>
                  </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan="2">No data available</StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
        <Pagination sx={{mt: 2}} color={'primary'} count={data?.totalPages} onChange={handlePageChange}/>
      </Container>
    </div>
  );
}

export default Index;
