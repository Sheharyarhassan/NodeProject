import React from 'react';
import {Spinner} from "reactstrap";

function PageLoader({isLoading}) {
   const mainStyle = {
      display: 'flex',
      height: '100%',
      width: '100%',
      position: 'absolute',
      background:'rgba(255,255,255,0.8)',
      alignItems: 'center',
      justifyContent: 'center',
   }
   if(isLoading) {
      return (
         <div style={mainStyle}>
            <Spinner
               color="primary"
               style={{
                  height: '3rem',
                  width: '3rem'
               }}
               type="grow"
            >
               Loading...
            </Spinner>
         </div>
      );
   }
}

export default PageLoader;