import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import './stacklist.css'
import Typography from '@mui/material/Typography';


export default function StackCard() {
  return (
    <Box className="bg-box" sx={{ width: '70%' }}>
      <Typography className="stack-title">
        EndorphinFlow is built with:
        </Typography>
      <Grid className="stack-grid" container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          
            <img className="stackimg" src="https://onextrapixel.com/wp-content/uploads/2016/04/reactjs-thumb.jpg"/>
        
        </Grid>
        <Grid item xs={6}>

          <img className="stackimg" src="https://res.cloudinary.com/practicaldev/image/fetch/s--_QMQU86---/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/6dnng3pre04xxdebia1g.png"/>
         
        </Grid>
        <Grid item xs={6}>
         <img className ="stackimg" src="https://cdn-media-1.freecodecamp.org/images/1*FDNeKIUeUnf0XdqHmi7nsw.png"/>
        </Grid>
        <Grid item xs={6}>
        <img className = "stackimg" src="https://miro.medium.com/max/812/0*xAADmPJN52Yy6XJV.jpg"/>
        </Grid>
        <Grid item xs={6}>
        <img className = "stackimg" src="https://www.scientiamobile.com/wp-content/uploads/2018/04/WebRTC-740-fi.png"/>
        </Grid>
        <Grid item xs={6}>
        <img className = "stackimg" src="data:image/png;base64,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"/>
        </Grid>
      </Grid>
    </Box>
  );
}
