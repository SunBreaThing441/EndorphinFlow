import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import './navbar.css'
import { Link } from 'react-router-dom'
import { FaBrain } from 'react-icons/fa'


export default function ButtonAppBar() {
  return (
    <Box>
      <AppBar className='nav1' position='static'>
        <Toolbar>
          <IconButton color='inherit'>
            <FaBrain size={'1.4em'} />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            EndorphinFlow
          </Typography >
          <Button component = {Link} to='/stack' color="inherit">About</Button>
          <Button component = {Link} to='/' color="inherit">Home</Button>
          
          <Button component = {Link} to='/login' color="inherit">Login</Button>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
