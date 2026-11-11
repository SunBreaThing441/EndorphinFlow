import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import { Box } from '@mui/system';
import { getPractitioners } from './helpers';
import { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';

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
import './praccard.css';

export default function PractitionerCard() {
  const [expanded, setExpanded] = React.useState(false);
  const [practitioners, setPractitioners] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    getPractitioners().then((practitioners) => setPractitioners(practitioners));
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
    const practitionerObject = practitioners[index];
    if (practitionerObject.expanded) {
      practitionerObject.expanded = false;
    } else {
      practitionerObject.expanded = true;
    }
    const newPractitioners = practitioners;
    newPractitioners[index] = practitionerObject;
    setPractitioners([...newPractitioners]);
    setExpanded(!expanded);
  };

  function updateSearchTerm(event) {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  }

  const filteredPractitioners = practitioners.filter((practitioner) => {
    if (searchTerm === '') return true;
    for (const key in practitioner) {
      if (
        practitioner[key]
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
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
              label='Search Practitioners'
              onChange={updateSearchTerm}
              variant='outlined'
            />

            <h1 style={{ color: '#f0f0f0' }}>{searchTerm}</h1>

            {filteredPractitioners.map((practitioner, index) => (
              <Card className='practitioner' style={{ color: '#f0f0f0' }}>
                <CardHeader
                  avatar={
                    <Stack direction='row' spacing={2}>
                      <StyledBadge
                        overlap='circular'
                        badgeContent={parseInt(practitioner.available)}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        variant='dot'>
                        <Avatar
                          sx={{ bgcolor: red[500] }}
                          aria-label='recipe'
                          src={practitioner.picture}
                        />
                      </StyledBadge>
                    </Stack>
                  }
                  title={`${practitioner.first_name} ${practitioner.last_name}`}
                  subheader={`Expertise: ${practitioner.specialty}`}
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
                    expand={practitioner.expanded}
                    onClick={() => handleExpandClick(index)}
                    aria-expanded={practitioner.expanded}
                    aria-label='show more'>
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>

                <Collapse
                  in={practitioner.expanded}
                  timeout='auto'
                  unmountOnExit>
                  <CardContent>
                    <Typography paragraph>
                      {practitioner.information}
                    </Typography>
                    <Typography variant='h6' color='Primary' fontWeight='bold'>
                      Treatment Approach
                    </Typography>
                    <Typography paragraph>
                      <b>Types of Therapy:</b> {practitioner.treatmenttype}{' '}
                      <br />
                      <b>Client Focus: </b>
                      {practitioner.clientfocus}
                      <br />
                    </Typography>

                    <Typography variant='h6' color='Primary' fontWeight='bold'>
                      Finances
                    </Typography>
                    <Typography paragraph>
                      <b>Cost per Session:</b> {practitioner.cost} <br />
                    </Typography>

                    <Typography variant='h6' color='Primary' fontWeight='bold'>
                      Qualifications
                    </Typography>
                    <Typography paragraph>
                      <b>School: </b>
                      {practitioner.school} <br />
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            ))}
          </>
        </div>
      </Box>
    </div>
  );
}
