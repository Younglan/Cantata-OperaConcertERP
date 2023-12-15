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


export const TicketContext = createContext();
export const SeatContext = createContext();
function Ticket(){
    const [page, setPage] = useState(1);

    const [ptno, setPtno] = useState("");
    const [perform, setPerform] = useState({
        pf_title:"공연을 선택해주세요",
        
    });
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
        fetch(`http://localhost:8090/pfinfo?name=${title}`)
        
        .then(res => {
          return res.json();
        })
        
        .then(data => setPerform(data))
        .catch(err => console.error(err));
       
        
    };
    async function resToticket(){
        for(let tmpseat of seatno){
            try{
                const response = await fetch("http://localhost:8090/ticketing",
                {
                    method: 'POST',
                    headers: { 'Content-Type':'application/json',
                            },
                    body: JSON.stringify({
                        seat_no:`${tmpseat}`,
                        tic_pay:`${catpay}-${category}`,
                        pt_no:{
                            pt_no:ptno
                        },
                        id:{
                            id:"admin"
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
        seatMax.current=seatno.length;
    },[seatcat]);
   
    const seatChange=useCallback((selected, seatnum, styleSeat)=>{
        setSeatcat({
            select : selected,
            seat : seatnum, 
            class : styleSeat
        });
        if(seatMax.current>4){
            return selected ? !selected : selected
        }else{
            return !selected
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
                  
                    

                }}>
                <TicketHeader page={page}/>
                <div className="tick_cont">
                    <div className="tick_canvas">
                        {page===1?<TicketMain/>:page===2?<TicketSeat value={seatChange} seat={seat}/>:page===3?<TicketPay/>:<TicketPrint ticket={ticket.current}/>}
                    </div>

                    {page!==4?<TicketStatus/>:<TicketInfo ticket={ticket.current}/>}
                </div>
            </TicketContext.Provider>
        </div>  
    );
}

export default Ticket;

