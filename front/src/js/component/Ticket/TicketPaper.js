import React,{ forwardRef, useContext } from "react";
import { TicketContext } from "./Ticket";
import moment from "moment";
import { Table, TableCell, TableContainer, TableRow } from "@mui/material";
import QRCode from "qrcode.react";
import "./css/TicketPaper.css"
import { parseJwt } from "../../../loginUtil";
const TicketPaper = forwardRef((prop, ref)=>{
    const ticketInfo = useContext(TicketContext);
    const token = sessionStorage.getItem("jwt");
    return(
        <section ref={ref} className="paper_sec">
          {prop.ticket.map((ele,i)=>{
            return(
            <div className="paper" key={ele}>
              <div className="paper_header">
                예약번호  | {ele} 
              </div>
            
              <div className="paper_table">
                  <div>
                    <TableContainer>
                      <Table size="small" aria-label="a dense table">
                        <tbody>
                        
                        <TableRow>
                          <TableCell align="center" component="th" style={{width:"auto"}}>상품</TableCell>
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
                          <TableCell align="center"> {ticketInfo.seatno[i]}</TableCell>
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
                                  <TableCell align="center">{parseJwt(token)}</TableCell>
                              </TableRow>
                              <TableRow>
                                  <TableCell align="center" component="th">연락처</TableCell>
                                  <TableCell align="center">010-4162-0646</TableCell>
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
                  <QRCode value={String(ele)}/>
              </div>
            </div>
            );
        })}
        </section>
    );
});

export default TicketPaper;