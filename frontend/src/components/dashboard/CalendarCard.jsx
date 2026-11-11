import { Box } from "@mui/system";
import Calendar from "./calendar/calendar";

export default function Card() {
  return (
    <div>
      <Box className="clickbox">
        <Calendar />
      </Box>
      <div></div>
    </div>
  );
}
