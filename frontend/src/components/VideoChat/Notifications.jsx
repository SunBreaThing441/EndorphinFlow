import React, { useContext } from 'react';
import { Button, Typography } from '@material-ui/core';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { SocketContext } from '../../Context';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ marginLeft: 7 }}>
          <Typography>{call.name || 'Unknown'} is calling:</Typography>
          <Button variant='contained' color='secondary' onClick={answerCall}>
            <PhoneInTalkIcon />
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;
