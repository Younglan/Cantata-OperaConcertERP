
import { Typography, Box} from "@mui/material";
import "./css/TicketHeader.css"
function TicketHeader(prop){
    const tickBold=(ph_ele)=>{
        if(prop.page === ph_ele){
            return({fontSize: 'h4.fontSize', fontWeight: 'bold', m: 2});
        }
        else{
            return({fontSize: 'h4.fontSize', m: 2, color: '#c5c5c5' })
        }
        
    };
    return(
        <Typography component="div" className="tick_header">
            <Box sx={tickBold(1)}>극장/관람일/시간</Box>
            <Box sx={{ fontSize: 'h4.fontSize', m: 2, fontWeight: 'bold', color: '#808080'}}>&gt;</Box>
            <Box sx={tickBold(2)}>좌석 선택</Box>
            <Box sx={{ fontSize: 'h4.fontSize', m: 2, fontWeight: 'bold', color: '#808080'}}>&gt;</Box>
            <Box sx={tickBold(3)}>결제</Box>
            <Box sx={{ fontSize: 'h4.fontSize', m: 2, fontWeight: 'bold', color: '#808080'}}>&gt;</Box>
            <Box sx={tickBold(4)}>발권</Box>
        </Typography>
    );
}

export default TicketHeader;