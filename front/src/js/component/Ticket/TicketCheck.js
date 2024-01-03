import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";



function TicketCheck(){
    const { check: checkticket } = useParams();
        const navigate = useNavigate();
        useEffect(() => {
          
            updateTicketStatus();
        }, []);
        const updateTicketStatus = (ticket) =>{
            const token = sessionStorage.getItem("jwt");
            fetch(`http://localhost:8090/ticket/ticketcheck/?ticket=${checkticket}`, 
                {
                    method: 'PUT',
                    headers: { 'Content-Type':'application/json','Authorization': token}
                })
            .then(response => {
                if(response.ok){
                    alert(`${checkticket}번 티켓의 검표가 완료되었습니다!`)
                    navigate("/");
                }
                else{
                    alert('Something went wrong!');
                }
            })
            .catch(err => console.error(err))
        };
       
    return(
        <div >
            {checkticket}번 티켓의 검표가 완료되었습니다!
        </div>  
    );
}

export default TicketCheck;

