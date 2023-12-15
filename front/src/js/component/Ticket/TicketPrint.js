import { useContext } from "react";
import { TicketContext } from "./Ticket";
import "./css/TicketPrint.css";
import { Table, TableCell, TableContainer, TableRow } from "@mui/material";
import moment from "moment";
import 'moment/locale/ko';
function TicketPrint({ticket}){
    const ticketInfo = useContext(TicketContext);
    console.log(ticket);
    return(
        <div className="tf_main">
          <div className="tf_left">
            <div className="tf_left_top">
              <div>
                {ticketInfo.perform["pf_poster"]}
              </div>
            
              <div className="tf_info_top">
                  <TableContainer>
                    <Table size="midium" aria-label="a dense table">
                      <tbody>
                      <TableRow>
                        <TableCell align="left" colSpan={2} component="th" style={{backgroundColor:"#BB2649",color:"white",fontSize:"18px",fontWeight:"bold"}}>예약번호  |  {ticket.map(ele=>`${ele} `)} (총 {ticketInfo.seatno.length}매)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center" component="th">상품</TableCell>
                        <TableCell align="center"> {ticketInfo.perform["pf_title"]}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center" component="th">장소</TableCell>
                        <TableCell align="center">부산 오페라하우스</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center" component="th">일시</TableCell>
                        <TableCell align="center"> {moment(ticketInfo.timedate).format("YYYY년 MM월 DD일 (dd) a HH시mm분")}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center" component="th">좌석</TableCell>
                        <TableCell align="center"> {ticketInfo.seatno.map((it)=>{
                          var tmp1 = /\d/.test(it[1])?it[0]:it.substr(0,3);
                          var tmp2 = /\d/.test(it[1])?it.substr(1):it.substr(3);
                          return `${tmp1}열 ${tmp2}번 `
                        })}</TableCell>
                      </TableRow>
                      </tbody>
                    </Table>
                  </TableContainer>
            
                
              </div>
            </div>
            <div className="tf_left_bot">
              <TableContainer>
                  <Table size="midium" aria-label="a dense table">
                    <tbody>
                      <TableRow>
                        <TableCell align="center" component="th" style={{width:"20%"}}>예매자</TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center" component="th">연락처</TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center" component="th">티켓수령</TableCell>
                        <TableCell align="center"> 온라인 발권 </TableCell>
                      </TableRow>
                    </tbody>
                  </Table>
                </TableContainer>
            </div>
          </div>
          
        </div>
    );
}

export default TicketPrint;
