import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <div sx={{ display: 'flex', justifyContent: "center", alignItems: "center", width: "100%", height: "100%"}}>
      <Box>
         <CircularProgress thickness={5}/>
      </Box>
    </div>
  );
}