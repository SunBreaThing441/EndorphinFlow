import * as React from 'react';
import { Box } from '@mui/system';
import { getPatients } from './helpers';
import { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';

import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VideocamIcon from '@mui/icons-material/Videocam';
import ChatIcon from '@mui/icons-material/Chat';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import './patientcard.css';

export default function PatientCard() {
  const [expanded, setExpanded] = React.useState(false);
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    getPatients().then((patients) => setPatients(patients));
  }, []);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = (index) => {
    const patientObject = patients[index];
    if (patientObject.expanded) {
      patientObject.expanded = false;
    } else {
      patientObject.expanded = true;
    }
    const newPatients = patients;
    newPatients[index] = patientObject;
    setPatients([...newPatients]);
    setExpanded(!expanded);
  };

  function updateSearchTerm(event) {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  }

  const filteredPatients = patients.filter((patient) => {
    if (searchTerm === '') return true;
    for (const key in patient) {
      if (
        patient[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  });

  return (
    <div>
      <Box className='clickbox' sx={{ bgcolor: 'background.paper' }}>
        <div>
          <>
            <TextField
              id='outlined-basic'
              label='Search Patients'
              onChange={updateSearchTerm}
              variant='outlined'
            />

            <h1 style={{ color: '#f0f0f0' }}>{searchTerm}</h1>
            {filteredPatients.map((patient, index) => (
              <Card className='patient' style={{ color: '#f0f0f0' }}>
                <CardHeader
                  avatar={
                    <Stack direction='row' spacing={2}>
                      <StyledBadge
                        overlap='circular'
                        badgeContent={parseInt(patient.available)}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        variant='dot'>
                        <Avatar
                          sx={{ bgcolor: red[500] }}
                          aria-label='recipe'
                          src={patient.picture}
                        />
                      </StyledBadge>
                    </Stack>
                  }
                  title={`${patient.first_name} ${patient.last_name}`}
                  subheader={`Issues: ${patient.disease}`}
                />

                <CardActions disableSpacing>
                  <IconButton aria-label='share'>
                    <EventAvailableIcon />
                  </IconButton>
                  <IconButton aria-label='share'>
                    <ChatIcon />
                  </IconButton>
                  <IconButton aria-label='share'>
                    <VideocamIcon />
                  </IconButton>
                  <ExpandMore
                    expand={patient.expanded}
                    onClick={() => handleExpandClick(index)}
                    aria-expanded={patient.expanded}
                    aria-label='show more'>
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>

                <Collapse in={patient.expanded} timeout='auto' unmountOnExit>
                  <CardContent>
                    <Typography paragraph>{patient.information}</Typography>

                    <Typography paragraph>
                      <b>Age: </b>
                      {patient.age}
                      <br />
                    </Typography>

                    <Typography paragraph>
                      <b>Based: </b> {patient.city} <br />
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            ))}
          </>
        </div>
      </Box>
      <div></div>
    </div>
  );
}
