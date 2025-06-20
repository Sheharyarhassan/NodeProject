import React from 'react';
import {CircularProgress} from "@mui/material";

function PageLoader({isLoading}) {
  const mainStyle = {
    display: 'flex',
    height: '100vh',
    width: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  }
  if (isLoading) {
    return (
      <div style={mainStyle}>
        <CircularProgress/>
      </div>
    );
  }
}

export default PageLoader;