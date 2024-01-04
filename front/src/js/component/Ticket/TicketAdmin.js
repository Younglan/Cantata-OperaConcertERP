import React, { useEffect, useRef, useState } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { Button, IconButton, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Navigate, useNavigate } from "react-router-dom";
import moment from 'moment';
import ReactToPrint from 'react-to-print';
import TicketPaperOne from './TicketPaperOne';
import styled from '@emotion/styled';


const SERVER_URL='http://localhost:8090';
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

function TicketAdmin(){
    const ref = useRef();
    const token = sessionStorage.getItem("jwt");
    const [ticket,setTicket] = useState([]);
    const navigate = useNavigate();
   
    useEffect(()=>{
        fetchTicket();
    },[]);
    const fetchTicket=()=>{
        fetch(SERVER_URL + '/admin/ticket',{ 
            headers: { 
            'Authorization': token
                }})
            .then(response => response.json())
            .then(data => {
                console.log(moment(data[0].tic_date).format("YYYY년 MM월 DD일 (dd) HH시mm분"));
                setTicket(data);
            })
            .catch(err => {
          
            });
    }
    const onDelClick = (id) => {
        if(window.confirm("해당 티켓을 취소합니까?")) {
            fetch(SERVER_URL + '/admin/ticket/remove/?id='+id,{ 
                headers: { 
                'Authorization': token
                    }})
            .then(response => {
                if(response.ok){
                    fetchTicket();
                }
                else{
                    alert('Something went wrong!');
                }
                    
            })
            .catch(err => console.error(err))
        } 
    }
       
    const columns = [ 
        {field: 'tic_no', headerName: '예약번호',width: 80, headerAlign: 'center',align: 'center'}, 
        {field: 'id', headerName: '유저', width: 110,headerAlign: 'center',align: 'center', 
        valueFormatter: (params) => params.value.id}, 
        {field: 'pt_no', headerName: '공연 제목', width: 350,headerAlign: 'center',
        align: 'center',
        valueFormatter: (params) => params.value.pfCode.pfTitle}, 
        {field: 'seat_no', headerName: '좌석', headerAlign: 'center',align: 'center',width: 110}, 
        {field: 'tic_date', headerName: '예매일', headerAlign: 'center',align: 'center',width: 300,
        valueFormatter: (params) => moment(params.value).format("YYYY년 MM월 DD일 (dd) HH시mm분")}, 
        {field: 'tic_pay', headerName: '결제방법', headerAlign: 'center',align: 'center',width: 120}, 
        {field: 'tic_status', headerName: '상태', headerAlign: 'center',align: 'center',width: 120}, 
        {
            field: 'row.row',
            headerName: '발권',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            filterable: false,
            renderCell: row =>
           
            <div>
                <ReactToPrint
                    trigger={() => <ColorButton>발 권</ColorButton>}
                    content={() => ref.current}
                /> 
              
                <div style={{display:"none"}}>
                    <TicketPaperOne ref={ref} ticket={row.row}/>
                </div>
            </div>
        },
        {
            field: 'row.check',
            headerName: '검표',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            filterable: false,
            renderCell: row => 
            <ColorButton onClick={()=>navigate("/ticketcheck/"+row.id)}>검표</ColorButton>
           
        },
        {
            field: 'row.id',
            headerName: '취소',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            filterable: false,
            renderCell: row =>
                <IconButton className="userListIconButton"
                    onClick={() => onDelClick(row.id)}>
                        <DeleteIcon color="error"/>
                </IconButton>
        }
        
        
    ];
   
    
    
    
    return(
        <div className='contentsArea'>
            <div className='contents'>
                <h1> 티켓리스트 </h1>
                <DataGrid
                className='ticList'
                rows={ticket}
                columns={columns}
                disableRowSelectionOnClick={true}
                getRowId={row => row.tic_no} 
                />
                
             
           
            </div>
        </div>
    );
    
   
}


export default TicketAdmin;