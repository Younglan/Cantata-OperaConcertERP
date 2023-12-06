import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import moment from 'moment/moment';
import "./css/TicketStatus.css"
import { useContext } from "react";
import { TicketContext } from "./Ticket";
import { leftSeat } from "./seatClass";
function TicketStatus(){
    const ticketInfo = useContext(TicketContext);
    const hiddenSeat = ticketInfo.page===2?{visibility:"visible"}:{visibility:"hidden"};
    const hiddenInfo = ticketInfo.perform.pf_poster?{visibility:"visible"}:{visibility:"hidden"};
    
    return(
        <div className="tick_status">
            <div className="ts_title">{ticketInfo.perform.pf_title}</div>
            <div className="ts_main" style={hiddenInfo}>
                <div className="ts_poster">{ticketInfo.perform.pf_poster}</div>
                <div className="ts_sub">{moment(ticketInfo.perform.pf_start).format("yyyy-MM-DD")}~<br/>{moment(ticketInfo.perform.pf_end).format("yyyy-MM-DD")}<br/>런타임 : {ticketInfo.perform.pf_runtime} 분</div>
            </div>
            <div className="ts_seat" style={hiddenSeat}>
                <div className="ts_seat_1">
                    <div>R석</div>
                    <div>S석</div>
                    <div>A석</div>
                    <div>B석</div>
                    <div>C석</div>
                    <div>D석</div>
                </div>
                <div className="ts_seat_2">
                    <div className={leftSeat(ticketInfo.seatno[0])}>{ticketInfo.seatno[0]}</div>
                    <div className={leftSeat(ticketInfo.seatno[1])}>{ticketInfo.seatno[1]}</div>
                    <div className={leftSeat(ticketInfo.seatno[2])}>{ticketInfo.seatno[2]}</div>
                    <div className={leftSeat(ticketInfo.seatno[3])}>{ticketInfo.seatno[3]}</div>
                    <div className={leftSeat(ticketInfo.seatno[4])}>{ticketInfo.seatno[4]}</div>
                    <div className={leftSeat(ticketInfo.seatno[5])}>{ticketInfo.seatno[5]}</div>
                </div>
            </div>
            <div className="ts_footer">
                <div className="ts_pay">
                    <div>
                        <span>총 결제금액 : </span>
                    </div>       
                    <div className="ts_payment">
                        <em>{ticketInfo.money}</em>
                        <span>원</span>
                    </div>   
                </div>
                <div>
                    <ColorButton disabled={!ticketInfo.buttonon} variant="contained" onClick={ticketInfo.pageNext}>{ticketInfo.page===4?"발 권":ticketInfo.page===3?"결 제":"다음 단계"}</ColorButton>
                </div>  
            </div>
        </div>
    );
}

export default TicketStatus;

const ColorButton = styled(Button)(({ theme }) => ({
    width: "95%",
    color: "white",
    backgroundColor: "#BB2649",
    fontSize : "15px",
    fontWeight : "bolder",
    '&:hover': {
        backgroundColor: "#DD486B",
      },
    '&:disabled': {
        backgroundColor: "#DD486B",
    }
  }));

