import { Pagination, PaginationItem } from "@mui/material";

import React, { useEffect, useState } from "react";
import MyTicket from "./MyTicket";
import { parseJwt } from "../../../loginUtil";

function TicketFind(){
    const [currentPage, setCurrentPage] = useState(1);
    const token = sessionStorage.getItem("jwt");
    const [ticketingData, setData] = useState([]);
    const [sliceData, setSliceData] = useState([]);
    const userid = parseJwt(token);
    const onPageChange = (e) => {
        
        setCurrentPage(Number(e.target.innerText));
    };

    async function resTicketfind(){
        
            try{
                const response = await fetch(`http://localhost:8090/ticket/ticketfind/?id=${userid}`,{
                    headers: { 
                    'Authorization': token
                        }});
                const data = await response.json();
                setData(data);
               
            }catch(e){
                console.error(e);
            }
    }
    async function reqTicketCancle(ele){
        
        try{
            await fetch(`http://localhost:8090/ticket/ticketcancle/?no=${ele}`,{
                headers: { 
                'Authorization': token
                    }});
        }catch(e){
            console.error(e);
        }
       resTicketfind();
    };  
    
    useEffect(()=>{
        resTicketfind();
    },[]);
    useEffect(()=>{
        setSliceData(ticketingData.slice((currentPage-1)*5,currentPage*5));
       
    },[currentPage,ticketingData]);
    
    return(
        <div>
            {sliceData.map((ele)=>{
                return(
                    <div key={ele.tic_no}>
                        <MyTicket info={ele} cancle={reqTicketCancle}/>
                    </div>
                   
                );
            })}
            
            <Pagination
                count={Math.ceil(ticketingData.length / 5)}
                page={currentPage}
                onChange={onPageChange}
                size="medium"
                
                // onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "15px 0",
                }}
                renderItem={(item) => (
                    <PaginationItem {...item} sx={{ fontSize: 12 }} />
                )}
            />
        </div>
    );
}

export default TicketFind;