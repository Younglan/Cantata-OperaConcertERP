import { Button} from "@mui/material";
import moment from "moment";
import React, { useRef} from "react";
import "./css/MyTicket.css"
import styled from "@emotion/styled";
import ReactToPrint from "react-to-print";
import TicketPaperOne from "./TicketPaperOne";

function MyTicket({info, cancle}){
    const ref = useRef();
    console.log(info);
    return(
        <div key={info.tic_no} className="Mytic_content">
            <div className="Mytic_poster" >
                <img src={info.pt_no.pfCode.pfPoster} alt="Myticket_poster" style={{height:"110px", margin:"5px"}}></img>
            </div>
            <div className="Mytic_info">
                <div className="Mytic_info_title">
                [{info.pt_no.pfCode.pfCate}] {info.pt_no.pfCode.pfTitle}
                </div>
                <div className="Mytic_info_sub">
                    <div>
                        장소: {info.pt_no.pfCode.plantNo.plantName}
                    </div>
                    <div>
                        회차정보: {moment(info.pt_no.pt_date).format("yyyy년 MM월 DD일 HH시 mm분")}
                    </div>
                    <div>
                        좌석정보: {info.seat_no}
                    </div>
                    <div>
                        상태: {info.tic_status}
                    </div>
                </div>
            </div>
            {info.tic_status!=="검표"?
            <div className="Mytic_button">
                
                
                <ReactToPrint
                    trigger={() => <ColorButton>발 권</ColorButton>}
                    content={() => ref.current}
                />     
                <Button onClick={()=>cancle(info.tic_no)} style={{width: "95%",
                                height: "30px",
                                color: "black",
                                backgroundColor: "lightgray",
                                fontSize : "15px",
                                fontWeight : "bolder",
                                '&:hover': {
                                    backgroundColor: "#DD486B",
                                },
                                '&:disabled': {
                                    backgroundColor: "#DD486B",
                                }}}>
                                    취 소
                </Button>
                <div style={{display:"none"}}>
                        <TicketPaperOne ref={ref} ticket={info}/>
                </div>
            </div>:""}
          
            
                       
        </div>   
    );
}

export default MyTicket;

const ColorButton = styled(Button)(({ theme }) => ({
    width: "95%",
    height: "30px",
    color: "white",
    backgroundColor: "#BB2649",
    fontSize : "15px",
    marginBottom : "5px",
    fontWeight : "bolder",
    '&:hover': {
        backgroundColor: "#DD486B",
      },
    '&:disabled': {
        backgroundColor: "#DD486B",
    }
  }));