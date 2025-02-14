import React, {useEffect, useState} from 'react';
import api from '../../../ApiHandle/api'
import PageLoader from "../../../Components/PageLoader";
import {Badge, Container} from "reactstrap";
function Index() {

   const [data,setData] = useState([]);
   const [loading,setLoading] = useState(false);
   const fetchData = async () => {
      setLoading(true);
      try {
         const response = await api.get('http://localhost:5000/api/book/GetAll',{},{isAdmin:true});
         setData(response.data);
      }
      catch (error) {
         console.log(error);
      }
      finally {
         setLoading(false);
      }
   }
   const updateStatus = async(active,id) => {
      setLoading(true);
      try{
         await api.patch(`http://localhost:5000/api/book/${active ? 'Deactivate' :'Activate'}/${id}`,{},
            {isAdmin:true})
         fetchData();
      }
      catch(error){
         console.log(error);
      }
      finally {
         setLoading(false);
      }
   }
   useEffect(() => {
      fetchData();
   },[])
   return (
      <div>
         <PageLoader isLoading={loading}/>
         <Container fluid>
            <table className="table table-striped">
               <thead>
                  <tr>
                     <th>Title</th>
                     <th>Author</th>
                     <th>Published Year</th>
                     <th>Genre</th>
                     <th>Status</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {data && data.map((item, index) => (
                     <tr key={index}>
                        <td>{item.title}</td>
                        <td>{item.author}</td>
                        <td>{item.publishedYear}</td>
                        <td>{item.genre.name}</td>
                        <td>{item.validFlag ?
                           <Badge color={"success-subtle text-dark"}>Active</Badge> :
                           <Badge color={"warning-subtle text-dark"}>Disabled</Badge>}
                        </td>
                        <td>{item.validFlag ?
                           <i className={'bx bx-trash text-danger'} role={'button'} onClick={()=>updateStatus(true,item._id)}></i>:
                           <i className={'bx bx-check text-success'} role={'button'} onClick={()=>updateStatus(false,item._id)}></i>}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </Container>
      </div>
   );
}

export default Index;