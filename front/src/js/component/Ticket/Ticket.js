import { useState, createContext, useEffect, useCallback, useRef } from "react";
import TicketHeader from "./TicketHeader";
import TicketMain from "./TicketMain";
import TicketStatus from "./TicketStatus";

import TicketSeat from "./TicketSeat";
import TicketPay from "./TicketPay";
import TicketPrint from "./TicketPrint";
import "./css/Ticket.css";
import TicketInfo from "./TicketInfo";
import useDidMountEffect from "./useDidMountEffect";
import TicketMainDetail from "./TicketMainDetail";
import { useLocation } from "react-router-dom";

import { parseJwt } from "../../../loginUtil";

export const TicketContext = createContext();
export const SeatContext = createContext();
function Ticket(){
    const [page, setPage] = useState(1);
    const { state } = useLocation();
    const [ptno, setPtno] = useState("");
    const [perform, setPerform] = useState(state?{
        pf_title:state.perform.pfTitle,
        pf_poster:state.perform.pfPoster,
        pf_start:state.perform.pf_start,
        pf_end:state.perform.pf_end,
        r:state.perform.r,
        s:state.perform.s,
        a:state.perform.a,
        b:state.perform.b,
        c:state.perform.c,
        d:state.perform.d
    }:{pf_title:"공연을 선택해주세요."});
    const [seat, setSeat] = useState([]);
    const [seatno, setSeatno] = useState("");
    const [buttonon, setButtonOn] = useState(false);
    const seatMax = useRef(false);
    const [money, setMoney] = useState(0);
    const [catpay, setCatpay] = useState("card");
    const [category, setCategory] = useState("");
    const ticket= useRef([]);
    const [timedate, setTimedate] = useState(new Date());
    const [seatcat, setSeatcat] = useState({
        select : false,
        seat : "", 
        class : ""
    });
    
    useEffect(()=>{
        setButtonOn(seatno.length!==0);
    }, [seatno]);

    useEffect(()=>{
       setCategory("");
       setButtonOn(false);
    }, [catpay]);
    

    const fetchPerformInfo=(title)=>{
        const token = sessionStorage.getItem("jwt");
        fetch(`http://localhost:8090/ticket/pfinfo?name=${title}`,{
            headers: { 
            'Authorization': token
                }})
        
        .then(res => {
          return res.json();
        })
        
        .then(data => setPerform(data))
        .catch(err => console.error(err));
       
        
    };
    async function resToticket(){
        const token = sessionStorage.getItem("jwt");
        for(let tmpseat of seatno){
            try{
                const response = await fetch("http://localhost:8090/ticket/ticketing",
                {
                    method: 'POST',
                    headers: { 
                        'Content-Type':'application/json',
                        'Authorization': token
                            },
                    body: JSON.stringify({
                        seat_no:`${tmpseat}`,
                        tic_pay:`${catpay}-${category}`,
                        pt_no:{
                            ptNo:ptno
                        },
                        id:{
                            id: parseJwt(token)
                        }
                    })
                });
                const data = await response.json();
                ticket.current.push(data.tic_no);
                
            }catch(e){
                console.error(e);
            }
        }
        setPage(page+1);
    }

    const pageNext = () => {
        
        if(page===4){
            alert(ticket.tic_no);
            // setPage(1);
        }else if(page===3){
            // setTicket();
            resToticket();
           
        }
        else{
            
            setPage(page+1);
            setButtonOn(false);
            
        } 
    };
    useDidMountEffect(()=>{
        if(seatno.length<6){
            if(seatcat.select!==true){
                setMoney(parseInt(money) + parseInt(perform[seatcat.class.toLowerCase()]));
                setSeatno([...seatno,seatcat.seat]);
                setButtonOn(true);
            }else{
              setMoney(parseInt(money) - parseInt(perform[seatcat.class.toLowerCase()]));
              setSeatno(seatno.filter(ele=>ele!==seatcat.seat));
            }
        }else if(seatno.includes(seatcat.seat)){
            
            setMoney(parseInt(money) - parseInt(perform[seatcat.class.toLowerCase()]));
            setSeatno(seatno.filter(ele=>ele!==seatcat.seat));
            
        }
        
        
    },[seatcat]);
   
    const seatChange=useCallback((selected, seatnum, styleSeat)=>{
        console.log(seatMax.current)
        if(seatMax.current>=6){
            if(selected){
                seatMax.current-=1;
                setSeatcat({
                    select : selected,
                    seat : seatnum, 
                    class : styleSeat
                });
                return !selected
            }else{
                
                return selected
            }
          
        }else{
            if(selected){
                seatMax.current-=1;
                setSeatcat({
                    select : selected,
                    seat : seatnum, 
                    class : styleSeat
                });
                return !selected
            }else{
                seatMax.current+=1;
                setSeatcat({
                    select : selected,
                    seat : seatnum, 
                    class : styleSeat
                });
                return !selected
            }
        }

            
        
    },[]);
    return(
        <div className="ticket_main">
            <TicketContext.Provider value={{
                    ptno, setPtno, 
                    perform, fetchPerformInfo, 
                    seatno, setSeatno, 
                    buttonon, setButtonOn, 
                    seat,setSeat,
                    money, setMoney,
                 
                    catpay, setCatpay,
                    category, setCategory,
                    page, pageNext,
                    timedate, setTimedate,
                    state
                    

                }}>
                <TicketHeader page={page}/>
                <div className="tick_cont">
                    <div className="tick_canvas">
                        {page===1&&state?<TicketMainDetail/>:page===1&&!state?<TicketMain/>:page===2?<TicketSeat value={seatChange} seat={seat}/>:page===3?<TicketPay/>:<TicketPrint ticket={ticket.current}/>}
                    </div>

                    {page!==4?<TicketStatus/>:<TicketInfo ticket={ticket.current}/>}
                </div>
            </TicketContext.Provider>
        </div>  
    );
}

export default Ticket;

