import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import "./css/TicketPay.css";

import React, { useContext } from "react";
import TicketPayment from "./TicketPayment";
import { TicketContext } from "./Ticket";
function TicketPay(){
    const ticketInfo = useContext(TicketContext);
    
    
    return(
        <React.Fragment>
          <div className="tp_main">
            <div className="tp_header">
              <Typography style={{fontSize:"20px",fontWeight:"bolder"}}>결제수단 선택</Typography>
            </div>
            <div className="tp_cont">
              <div className="tp_cont_sel">
                <FormControl>
                  <RadioGroup
                    onChange={(e, val)=>ticketInfo.setCatpay(val)}
                    value={ticketInfo.catpay}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel value="card" control={<Radio />} label="신용/체크카드" />
                    <FormControlLabel value="mobile" control={<Radio />} label="휴대폰 결제" />
                    <FormControlLabel value="ewallet" control={<Radio />} label="간편결제" />
                    <FormControlLabel value="account" control={<Radio />} label="무통장입금" />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="tp_cont_main">
                <TicketPayment catpay={ticketInfo.catpay} setCatpay = {ticketInfo.setCatpay}/> 
              </div>
            </div>
          </div>
        </React.Fragment>
    );
}

export default TicketPay;