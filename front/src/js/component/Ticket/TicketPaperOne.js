import { forwardRef} from "react";

import moment from "moment";
import { Table, TableCell, TableContainer, TableRow } from "@mui/material";
import QRCode from "qrcode.react";
import "./css/TicketPaper.css"
const TicketPaperOne = forwardRef((ticket, ref)=>{

    return(
        <section ref={ref} className="paper_sec">
        
           
            <div className="paper">
              <div className="paper_header">
                예약번호  | {ticket.ticket.tic_no} 
              </div>
            
              <div className="paper_table">
                  <div>
                    <TableContainer>
                      <Table size="small" aria-label="a dense table">
                        <tbody>
                        
                        <TableRow>
                          <TableCell align="center" component="th" style={{width:"auto"}}>상품</TableCell>
                          <TableCell align="center"> {ticket.ticket.pt_no.pfCode.pfTitle} </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center" component="th">장소</TableCell>
                          <TableCell align="center">{ticket.ticket.pt_no.pfCode.plant_no}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center" component="th">일시</TableCell>
                          <TableCell align="center"> {moment(ticket.ticket.tic_date).format("YYYY년 MM월 DD일 (dd) a HH시mm분")}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center" component="th">좌석</TableCell>
                          <TableCell align="center"> {ticket.ticket.seat_no}</TableCell>
                        </TableRow>
                        </tbody>
                      </Table>
                    </TableContainer>
              
                  
                  </div>
            
                  <div>
                      <TableContainer>
                          <Table size="small" aria-label="a dense table">
                              <tbody>
                              <TableRow>
                                  <TableCell align="center" component="th" style={{width:"auto"}}>예매자</TableCell>
                                  <TableCell align="center">{ticket.ticket.id.id}</TableCell>
                              </TableRow>
                              <TableRow>
                                  <TableCell align="center" component="th">연락처</TableCell>
                                  <TableCell align="center">{ticket.ticket.id.tel}</TableCell>
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
              <div className="paper_qr">
                  <QRCode value={String(ticket.ticket.tic_no)}/>
              </div>
            </div>
        </section>
    );
});

export default TicketPaperOne;