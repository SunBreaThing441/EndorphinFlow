import { Box } from '@mui/system';

import { makeStyles } from '@material-ui/core/styles';
// videoChat imports
import VideoPlayer from '../VideoChat/VideoPlayer';

const useStyles = makeStyles((theme) => ({
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));
export default function Card() {
  const classes = useStyles();
  return (
    <Box className='clickbox'>
      {/* vidPlayer */}
      <VideoPlayer />
    </Box>
  );
}
