import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { TicketContext } from "./Ticket";

function TicketPayment(props){
    const [name, setName] = useState("카드");
    const [list, setList] = useState(["농협", "BC", "신한", "현대"]);
    const [telecom, setTelecom] = useState("");
    const cardlist = ["농협", "BC", "신한", "현대"];
    const mobilelist = ["SKT", "KT", "LG"];
    const ewalletlist = ["삼성페이", "애플페이", "토스페이", "카카오페이"];
    const accountlist = ["농협","하나은행","국민","기업","우리"];
    const catpay = props.catpay;
    const ticketInfo = useContext(TicketContext);
    useEffect(()=>{  
        switch (props.catpay){
            case 'card' :     
                setName("카드");
                setList(cardlist);
                ticketInfo.setCategory(list[0]);
                break;
            case "mobile" :
                setName("통신사");
                setList(mobilelist);
                ticketInfo.setCategory(list[0]);
                break;
            case "ewallet" : 
                setName("페이");
                setList(ewalletlist);
                ticketInfo.setCategory(list[0]);
                break;
            case "account" :
                setName("은행");
                setList(accountlist);  
                ticketInfo.setCategory(list[0]);
                break;
            default :
                alert("오류");
                break;
            }
       
        ticketInfo.setButtonOn(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[catpay]);
    
    
    return(
        <React.Fragment>
            <Box sx={{ margin:"20px", minWidth: 120, width:"600px", display:"flex"}}>
                <FormControl sx={{width:"30%"}}>
                    <InputLabel id="demo-simple-select-label">{name}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={telecom}
                        label={name}
                        onChange={(event,val)=>{
                            setTelecom(event.target.value);
                            ticketInfo.setButtonOn(true);
                        }}
                    > 
                        {list.map((it)=>{return (<MenuItem key={it} value={it||"선택"}>{it}</MenuItem>)})}
                        
                        
                    </Select>
                </FormControl>
                {name==="통신사"?<TextField 
                    label="전화번호"
                    name="tel"
                    fullWidth
                    onChange={(e)=>{
                        ticketInfo.setCategory(telecom+"-"+e.target.value);
                        ticketInfo.setButtonOn(true);
                        }}/>:""}
            </Box>
        </React.Fragment>
    );
}

export default TicketPayment;