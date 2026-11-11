import React, { useState, useContext } from 'react';
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
} from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import Notifications from './Notifications';
import Tooltip from '@mui/material/Tooltip';
import { purple, green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

import { SocketContext } from '../../Context';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  gridContainer: {},
  container: {
    position: 'fixed',
    bottom: 5,
  },

  padding: {
    display: 'flex',
    padding: 5,
    justifyContent: 'space-between',
  },
  marginBot: {
    marginBot: 5,
  },
}));
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

const GreenButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: green[400],
  '&:hover': {
    backgroundColor: green[700],
  },
}));

const Sidebar = ({ children }) => {
  console.log('sidebar props:', children);
  const {
    me,
    callAccepted,
    name,
    setName,
    videoState,
    setVideoState,
    callEnded,
    leaveCall,
    callUser,
  } = useContext(SocketContext);

  const [idToCall, setIdToCall] = useState('');

  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Notifications />

      <form className={classes.root} noValidate autoComplete='off'>
        {/* xxxxxxxxxxxxx */}
        <Grid container className={classes.padding}>
          <Grid item xs={12} md={6} className={classes.padding}>
            <TextField
              label='Name'
              value={name}
              fullWidth
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          {/* xxxxxxxxxx */}
          <Grid item xs={12} md={6} className={classes.padding}>
            <TextField
              label='ID to Call'
              value={idToCall}
              fullWidth
              onChange={(e) => setIdToCall(e.target.value)}
            />
          </Grid>
          <Grid container className={classes.padding}>
            <Tooltip title='Turn camera on/off'>
              <ColorButton
                variant='contained'
                color='primary'
                onClick={() => {
                  setVideoState(!videoState);
                }}>
                {videoState ? <VideocamOffIcon /> : <VideocamIcon />}
                {''}
              </ColorButton>
            </Tooltip>
            {callAccepted && !callEnded ? (
              <Tooltip title='End call'>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={leaveCall}
                  className={classes.margin}>
                  <PhoneDisabled />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip title='Call with ID'>
                <GreenButton
                  variant='contained'
                  color='primary'
                  // fullWidth
                  onClick={() => callUser(idToCall)}
                  className={classes.margin}>
                  <Phone />
                </GreenButton>
              </Tooltip>
            )}
            <CopyToClipboard text={me} className={classes.margin}>
              <Tooltip title='Copy your ID'>
                <ColorButton variant='contained' color='primary'>
                  <Assignment />
                </ColorButton>
              </Tooltip>
            </CopyToClipboard>
          </Grid>
        </Grid>
      </form>
      {children}
    </Container>
  );
};

export default Sidebar;
