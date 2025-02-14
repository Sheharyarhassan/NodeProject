import React, { useEffect, useState } from "react";
import PageLoader from "../../../Components/PageLoader";
import {Badge, Container} from "reactstrap";
import api from "../../../ApiHandle/api"
function Index() {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const fetchData = async () => {
      setLoading(true);
      try {
         await api.get("http://localhost:5000/api/genre/getAll",
            {isAdmin:true}).then(data => {
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
   const updateStatus = async(active,id) =>{
      setLoading(true);
      try {
         await api.patch(`http://localhost:5000/api/genre/${active ? 'Deactivate' : 'Activate'}/${id}`
            ,{}, {isAdmin: true})
         fetchData();
      }
      catch(error){
         console.log(error);

      }finally {
         setLoading(false);
      }
   }
   useEffect(() => {
      fetchData();
   }, []);

   return (
      <div>
         <PageLoader isLoading={loading} />
         <Container className="mt-4">
            <table className="table table-striped">
               <thead className="thead-light">
               <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th className={'text-center'}>Action</th>
               </tr>
               </thead>
               <tbody>
               {data && data?.length > 0 ? (
                  data.map((item, index) => (
                     <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.validFlag? <Badge color={"success"}>Active</Badge>: <Badge color={"warning"}>Disabled</Badge>}</td>
                        <td className={'text-center'}>{item.validFlag ?
                           <i role={"button"} className={"bx bx-trash text-danger"} onClick={()=>updateStatus(true,item._id)}></i>
                           : <i role={"button"} className={"bx bx-check text-success"} onClick={()=>updateStatus(false,item._id)}></i>}
                        </td>
                     </tr>
                  ))
               ) : (
                  <tr>
                     <td colSpan="2">No data available</td>
                  </tr>
               )}
               </tbody>
            </table>
         </Container>
      </div>
   );
}

export default Index;
