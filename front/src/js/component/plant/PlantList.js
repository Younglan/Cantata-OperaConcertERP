import React, { useEffect, useState, useRef } from 'react';
import { DataGrid,GridToolbar} from '@mui/x-data-grid';
import { Snackbar } from '@mui/material';
import { useNavigate } from "react-router-dom";
import './css/plantList.css';

const SERVER_URL='http://localhost:8090';

function PlantList(){
    const navigate = useNavigate();
    const[Plant, setPlant] = useState([]);
    const [open, setOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const Plantcolumns = [ 
        { 
            field: 'plantMainimg', 
            headerName: '이미지', 
            width: 150, 
            headerAlign: 'center', 
            renderCell: (params) => (
              <a href={`/plantDetail/${params.row.plantNo}`}>
              <img src={params.value} alt="Plant Main Image" style={{ width: '100%', height: 'auto' }} />
              </a>
            ),
          },

        {field: 'plantName', headerName: '장소명',headerAlign: 'center'}, 

        {field: 'plantUse', headerName: '용도', width: 150,headerAlign: 'center'
        }, 

        {field: 'plantDetail', headerName: '시설설명', width: 150,headerAlign: 'center',renderCell: (params) => (
            <div dangerouslySetInnerHTML={{ __html: params.value ? params.value.replace(/<p>/g, '').replace(/<\/p>/g, '') : '' }} />
          ),
       }, 

        {field: 'capacity', headerName: '수용인원', width: 150,headerAlign: 'center'
        }, 
        {field: 'floor', headerName: '층수', width: 150,headerAlign: 'center'
        },
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
                    </div>
                )
            }
        ] : []),
         ];

    const fetchPlant= () => {
        fetch('http://localhost:8090/plants/getplant',{method:"GET"})
        .then(response => response.json())
        .then(data => {
            setPlant(data);
        })
        .catch(err => console.error(err));
    };
    const plantref = useRef();

    const onDelClick = (plantNo) => {
        if (window.confirm("정말로 해당 컨텐츠를 삭제하시겠습니까?")){
            fetch(SERVER_URL+'/plants/'+plantNo,
                 {method: 'DELETE',
                 })
            .then(response => {
                if(response.ok){
                    fetchPlant();
                    setOpen(true);
                }else{
                    alert("잘못된 시도입니다!");
                }
                
            })
            .catch(err => {
                console.error(err);
                navigate("/errorPage");
            });
        }
        
    };

    useEffect(() => {
        if (Object.keys(sessionStorage).length > 0) {
            // sessionStorage에 저장된 값이 하나 이상 있을 때의 처리
            const role = sessionStorage.getItem("role");
            if(role === 'ADMIN'){
                setIsAdmin(true);
            }
        } else {
            // sessionStorage에 저장된 값이 하나도 없을 때의 처리
        }        
        fetchPlant();
    },[plantref,isAdmin]);

    return(
        <div className='contentsArea'>
            <div className='contents'>
            <h1>시설 목록</h1>
                <DataGrid className='plantList'
                    rows={Plant}
                    columns={Plantcolumns}
                    disableColumnMenu
                    disableRowSelectionOnClick={true}
                    getRowId={row => row.plantNo}/>
                     {isAdmin ?<button className='redButton' onClick={() => navigate("/Newplant")}>새 시설 등록</button>: null }
                 <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="목록이 삭제되었습니다."
                />
            </div>
        </div>
    );
}
export default PlantList;