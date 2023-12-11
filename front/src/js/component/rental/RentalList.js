import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Snackbar } from '@mui/material';
import { useNavigate } from "react-router-dom";

const SERVER_URL='http://localhost:8090';

function RentalList(){
    const navigate = useNavigate();
    //데이터호출
    const[Rental, setRental] = useState([]);
    const[cpname, setcpname] = useState('1');
    const [open, setOpen] = useState(false);
    

    const columns = [ 
        {field: 'rent_name', headerName: '신청자명',headerAlign: 'center'}, 
        {field: 'rent_start', headerName: '공연이름', width: 50,headerAlign: 'center'}, 
        {field: 'rent_end', headerName: '장소', width: 200,headerAlign: 'center'}, 
        {field: '_links.self.href',
         headerName: '',
         sortable:false,
         filterable: false,
        //  renderCell: row =>
        //     <button onClick={() => onDelClick(row.id)}>삭제</button>
        }
    ];

    useEffect(() => {
        fetchRentals();
        
    }, []);

    const fetchRentals= () => {
        fetch(SERVER_URL+'/rentallist'+`/?cp=${cpname}`)
        .then(response => response.json())
        .then(data => setRental(data._embedded.rental))
        .catch(err => console.error(err));
    };

    // const onDelClick = (url) => {
    // console.log(" url확인 : "+url);
    //     if (window.confirm("정말로 해당 컨텐츠를 삭제하시겠습니까?")){
    //         fetch(url, {method: 'DELETE'})
    //         .then(response => {
    //             if(response.ok){
    //                 fetchRentals();
    //                 setOpen(true);
    //             }else{
    //                 alert("잘못된 시도입니다!");
    //             }
                
    //     })
    //     .catch(err => console.error(err))
    //     }
        
    // }

    return(
        <div className='contentsArea'>
            <div className='contents'>
            
            <button onClick={() => navigate("/performList/newPerform")}>새 컨텐츠 등록</button>
                <DataGrid className='pfList'
                    rows={Rental} 
                    columns={columns}
                    disableRowSelectionOnClick={true}
                     getRowId={row => row._links.self.href}/> 

                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="공연이 삭제되었습니다."
                />

            </div>
        </div>
    );
}


export default RentalList;