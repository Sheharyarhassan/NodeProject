import React, {useEffect, useState} from "react";
import PageLoader from "../../../Components/PageLoader";
import api from "../../../ApiHandle/api"
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
      await api.get("http://localhost:5000/api/genre/getAll").then(data => {
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
  }, []);
  const StyledTableRow = styled(TableRow)(({theme}) => ({
    ['&:nth-of-type(odd)']: {
      backgroundColor: theme.palette.action.hover
    },
    ['&:last-child td,&:last-child th']: {
      border: 0
    }
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
            {data && data?.length > 0 ? (
              data.map((item, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{item.name}</StyledTableCell>
                  <StyledTableCell>
                    {item.validFlag ?
                      <Chip color="success" label={'Active'}/> :
                      <Chip color="danger" label={'Disabled'}/>
                    }
                  </StyledTableCell>
                  <StyledTableCell className={'text-center'}>{item.validFlag ?
                    <i role={"button"} className={"bx bx-trash text-danger"}
                       onClick={() => updateStatus(true, item._id)}></i>
                    : <i role={"button"} className={"bx bx-check text-success"}
                         onClick={() => updateStatus(false, item._id)}></i>}
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
      </Container>
    </div>
  );
}

export default Index;
