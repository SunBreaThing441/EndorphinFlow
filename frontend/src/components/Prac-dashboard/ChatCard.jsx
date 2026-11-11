import { Box } from '@mui/system';
import ChatBox from '../ChatBox/ChatBox';

export default function Card() {
  return (
    <div>
      <Box className='clickbox'>
        <ChatBox />
      </Box>
    </div>
  );
}
