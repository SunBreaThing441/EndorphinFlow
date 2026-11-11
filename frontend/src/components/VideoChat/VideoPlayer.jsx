import React, { useContext } from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import { SocketContext } from '../../Context';
import Sidebar from './Sidebar';

// these are the styles for the video player size and how it should appear
// across desktop and mobile devices
const useStyles = makeStyles((theme) => ({
  video: {
    width: '100%',
    borderRadius: 5,
    boxShadow: 3,

    justifyContent: 'center',
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {},
}));

const VideoPlayer = () => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
  } = useContext(SocketContext);

  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.gridContainer}>
      {/* video from client outgoing */}
      {stream && (
        <Grid item md={6} className={classes.video}>
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            className={classes.video}
          />
        </Grid>
      )}

      {/* video from peer incoming */}
      {callAccepted && !callEnded && (
        <Grid item md={6} className={classes.video}>
          <video
            playsInline
            ref={userVideo}
            autoPlay
            className={classes.video}
          />
        </Grid>
      )}

      <Sidebar />
    </Grid>
  );
};

export default VideoPlayer;
