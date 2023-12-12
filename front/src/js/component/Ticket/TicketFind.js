import { Pagination, PaginationItem } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";

function TicketFind(){
    const [currentPage, setCurrentPage] = useState(1);
    
    const [ticketingData, setData] = useState([]);
    const [sliceData, setSliceData] = useState([]);
    const userid = "admin";
    const onPageChange = (e) => {
        
        setCurrentPage(Number(e.target.innerText));
    };
    async function resTicketfind(){
        
            try{
                const response = await fetch(`http://localhost:8090/ticketfind/?id=${userid}`);
                const data = await response.json();
                setData(data);
               
            }catch(e){
                console.error(e);
            }
    }
        
    
    useEffect(()=>{
        resTicketfind();
    },[]);
    useEffect(()=>{
        setSliceData(ticketingData.slice((currentPage-1)*5,currentPage*5));
        
    },[currentPage,ticketingData]);
    
    return(
        <React.Fragment>
            {sliceData.map((ele)=>{
                return(
                    <div key={ele.tic_no}>
                        {ele.pt_no.pfCode.pfTitle}<br/>
                        {moment(ele.pt_no.pt_date).format("yyyy년 MM월 DD일 HH시 mm분")}<br/>
                        {ele.seat_no}
                        
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
        </React.Fragment>
    );
}

export default TicketFind;