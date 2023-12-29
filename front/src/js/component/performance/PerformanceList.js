import React, { useEffect, useState } from 'react';
import { DataGrid,GridPagination   } from '@mui/x-data-grid';
import './PerformanceList.css';
import { Snackbar } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const SERVER_URL='http://localhost:8090';

function PerformanceList(){
    const navigate = useNavigate();
    //데이터호출
    const[performances, setPerformances] = useState([]);
    const [delOpen, setDelOpen] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);
    const[isAdmin, setIsAdmin] = useState(false);
   

    useEffect(() => {
        if (Object.keys(sessionStorage).length > 0) {
            // sessionStorage에 저장된 값이 하나 이상 있을 때의 처리
            const role = sessionStorage.getItem("role");
            if(role === 'ADMIN'){setIsAdmin(true)}
        } else {
            // sessionStorage에 저장된 값이 하나도 없을 때의 처리
        }        
        fetchPerforms();
          
    }, [isAdmin]);

    const fetchPerforms = () => {
        fetch(SERVER_URL + '/performances/allPerform')
            .then(response => response.json())
            .then(data => {
                let filteredPerforms = null;
                if (isAdmin) {// 상태 체크 후 pfStatus가 ture인 것만 표시
                    filteredPerforms = data.filter((perform) => perform.pfStatus === true).reverse();
                } else {// 상태 체크 후 pfStatus와 expose가 ture인 것만 표시
                    filteredPerforms = data.filter(perform => perform.pfStatus === true && perform.expose === true).reverse();
                }
                setPerformances(filteredPerforms);
            })
            .catch(err => console.error(err));
    };

    const columns = [ 
        {field: 'pfCode', headerName: '공연 코드',width: 80, headerAlign: 'center',align: 'center'}, 
        {field: 'pfCate', headerName: '종류', width: 50,headerAlign: 'center',align: 'center'}, 
        {   field: 'pfTitle', 
            headerName: '공연 제목', 
            width: 350,
            headerAlign: 'center',
        renderCell : row => (
            <div 
                style={{cursor:'pointer'}}
                onClick={() => onRowClick(row.id)}
                >
                    {row.value}
                </div>
        ),
    }, 
        {field: 'pfStart', headerName: '공연 시작일', headerAlign: 'center',align: 'center',width: 110}, 
        {field: 'pfEnd', headerName: '공연 종료일', headerAlign: 'center',align: 'center',width: 110}, 
        {field: 'agency', headerName: '배급사', headerAlign: 'center',align: 'center',width: 120}, 
        ...(isAdmin ? [
            {
                field: 'expose',
                headerName: '관리메뉴',
                headerAlign: 'center',
                align: 'center',
                sortable: false,
                filterable: false,
                renderCell: row => (
                    <div className='adminButton'>
                        <button onClick={() => onDelClick(row.id)}>삭제</button>&nbsp;
                        {row.value ? null : <button onClick={() => uploadClick(row.id)}>업로드</button>}
                    </div>
                )
            }
        ] : []),
    ];
   
    const onRowClick = (pfCode) => {
        navigate("/performanceDetail/"+pfCode);
    };

    const onDelClick = (pfCode) => {
        const updatedSatusData = {pfStatus : 'false'};
        if (window.confirm("정말로 해당 컨텐츠를 삭제하시겠습니까?")){
            fetch(SERVER_URL+'/performances/'+pfCode,
                 {method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        },
                    body: JSON.stringify(updatedSatusData)
                 })
            .then(response => {
                if(response.ok){
                    fetchPerforms();
                    setDelOpen(true);
                }else{
                    alert("잘못된 시도입니다!");
                }
                
        })
        .catch(err => console.error(err))
        }
        
    }
    const uploadClick = (pfCode) => {
        const updateExpose = {expose : 'true'};
        if (window.confirm("정말로 해당 컨텐츠를 업로드하시겠습니까?")){
            fetch(SERVER_URL+'/performances/'+pfCode,
                 {method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        },
                    body: JSON.stringify(updateExpose)
                 })
            .then(response => {
                if(response.ok){
                    fetchPerforms();
                    setUploadOpen(true);
                }else{
                    alert("잘못된 시도입니다!");
                }
                
        })
        .catch(err => console.error(err))
        }
    }

    if(performances.length === 0){
        return(
            <React.Fragment>
                <div className='contentsArea'>
                    <div className='contents'>
                        <h3>등록된 공연이 없습니다.</h3>

                        {isAdmin ? <button className='redButton' onClick={() => navigate("/performList/newPerform")}>새 컨텐츠 등록</button>: null }
                    </div>
                </div>
            </React.Fragment>
        );
    }
    return(
        <div className='contentsArea'>
            <div className='contents'>
                <h1> 공연리스트 </h1>
                <DataGrid
                className='pfList'
                rows={performances}
                columns={columns}

                disableRowSelectionOnClick={true}
                getRowId={row => row.pfCode} 
                /><br></br>
                {isAdmin ? <button className='redButton' onClick={() => navigate("/performList/newPerform")}>새 컨텐츠 등록</button>: null }
                <Snackbar
                open={delOpen}
                autoHideDuration={2000}
                onClose={() => setDelOpen(false)}
                message="공연이 삭제되었습니다."
                />
                <Snackbar
                open={uploadOpen}
                autoHideDuration={2000}
                onClose={() => setUploadOpen(false)}
                message="공연이 업로드되었습니다."
                />
            </div>
        </div>
    );
}


export default PerformanceList;