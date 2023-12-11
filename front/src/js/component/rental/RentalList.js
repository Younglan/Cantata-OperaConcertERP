import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
// import { Snackbar } from '@mui/material';
// import { useNavigate } from "react-router-dom";

// const SERVER_URL='http://localhost:8090';

function RentalList(){
    // const navigate = useNavigate();
    //데이터호출
    const[Rental, setRental] = useState([]);
    // const[cpname, setcpname] = useState('1');
    // const [open, setOpen] = useState(false);
    

    const columns = [ 
        {field: 'rent_name', headerName: '활동명',headerAlign: 'center'}, 

        {field: 'rent_start', headerName: '시작날짜', width: 150,headerAlign: 'center'
        ,valueFormatter: (params) => dayjs(params.value).format('YYYY/MM/DD'),}, 

        {field: 'rent_end', headerName: '종료날짜', width: 150,headerAlign: 'center'
        ,valueFormatter: (params) => dayjs(params.value).format('YYYY/MM/DD'),}, 
    ];
    
    const fetchRentals= () => {
        fetch('http://localhost:8090/allrental',{method:"GET"})
        .then(response => response.json())
        .then(data => {
                console.log(data);
                setRental(data);
            })
        .catch(err => console.error(err));
       
    };
    console.log(Rental);

    useEffect(() => {
        fetchRentals();
        
    }, []);
    
    


    return(
        <div className='contentsArea'>
            <div className='contents'>
                <DataGrid className='rentList'
                    rows={Rental} 
                    columns={columns}
                    disableRowSelectionOnClick={true}
                    getRowId={row => row.rent_name}/>
            </div>
        </div>
    );
}


export default RentalList;