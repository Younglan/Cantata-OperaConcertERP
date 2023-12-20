import React, { useEffect, useState, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { Snackbar } from '@mui/material';
// import { useNavigate } from "react-router-dom";

// const SERVER_URL='http://localhost:8090';

function RentalList(){
    // const navigate = useNavigate();
    //데이터호출
    const[Rental, setRental] = useState([]);
    // const[cpname, setcpname] = useState('1');
    const [open, setOpen] = useState(false);
    

    const columns = [ 

        {field: 'cp_no', headerName: '신청인명',headerAlign: 'center'}, 

        {field: 'rent_start', headerName: '시작날짜', width: 150,headerAlign: 'center'
        ,valueFormatter: (params) => dayjs(params.value).format('YYYY/MM/DD'),}, 

        {field: 'rent_end', headerName: '종료날짜', width: 150,headerAlign: 'center'
        ,valueFormatter: (params) => dayjs(params.value).format('YYYY/MM/DD'),}, 

        {field: 'rent_date', headerName: '신청날짜', width: 150,headerAlign: 'center'
        ,valueFormatter: (params) => dayjs(params.value).format('YYYY/MM/DD'),}, 
        {field: '_links.self.href',
         headerName: '관리메뉴',
         sortable:false,
         filterable: false,
         renderCell: row =>(
            <React.Fragment>
            <button onClick={() => onDelClick(row.id)}>취소</button>
            {row.status === '결제대기' && (
                <button onClick={() => onPayClick(row.id)}>결제</button>
              )}
              </React.Fragment>
        ),},
    ];
    
    const fetchRentals= () => {
        fetch('http://localhost:8090/rentals/allrental',{method:"GET"})
        .then(response => response.json())
        .then(data => {
            // const filteredrental = data.filter((rental) => rental.rent_status === "wait");
                console.log(data);
                setRental(data);
            })
        .catch(err => console.error(err));
       
    };
    const rentref = useRef()

    useEffect(() => {
        fetchRentals();
        
    },[rentref]);

    const onDelClick =(rent_no) => {
        // const updatedSatusData = {rent_status : "cancel"};
        if (window.confirm("정말로 해당 예약를 취소하시겠습니까?")){
            fetch('http://localhost:8090/rentals/delrental?rent_no='+rent_no,
                 {method: 'DELETE',
            })
            .then(response => {
                console.log(response)
                if(response.ok){
                    setRental(prevRental => ({ ...prevRental, id: 0 }));
                }else{
                    alert("잘못된 시도입니다!");
                }
                
        })
        .catch(err => console.error(err))
        }
    }
    const onPayClick = (rent_no) => {
        fetch(`http://localhost:8090/rentals/updateStatus?rent_no=${rent_no}&status=결제완료`, {
          method: 'PUT',
        })
          .then((response) => {
            console.log(response);
            if (response.ok) {
              setRental((prevRental) => ({ ...prevRental, id: 0 }));
            } else {
              alert('결제 처리 중 오류가 발생했습니다!');
            }
          })
          .catch((err) => console.error(err));
      };

    return(
        <div className='contentsArea'>
            <div className='contents'>
                <DataGrid className='rentList'
                    rows={Rental}
                    columns={columns}
                    disableRowSelectionOnClick={true}
                    getRowId={row => row.rent_no}/>
                 <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="예약이 삭제되었습니다."
                />
            </div>
        </div>
    );
}


export default RentalList;