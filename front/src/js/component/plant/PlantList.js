import React, { useEffect, useState, useRef } from 'react';
import { DataGrid,GridToolbar} from '@mui/x-data-grid';
import { Snackbar } from '@mui/material';
import { useNavigate } from "react-router-dom";
function PlantList(){
    const navigate = useNavigate();
    const[Plant, setPlant] = useState([]);
    const [open, setOpen] = useState(false);
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
         ];

    const fetchPlant= () => {
        fetch('http://localhost:8090/plants/getplant',{method:"GET"})
        .then(response => response.json())
        .then(data => {
            setPlant(data);
        })
        .catch(err => console.error(err));
    };
    const plantref = useRef()

    useEffect(() => {
        fetchPlant();
    },[plantref]);

    return(
        <div className='contentsArea'>
            <div className='contents'>
            <h1>시설 목록</h1>
                <DataGrid className='rentList'
                    rows={Plant}
                    columns={Plantcolumns}
                    disableColumnMenu
                    components={{
                        Toolbar: GridToolbar,
                      }}
                    disableRowSelectionOnClick={true}
                    getRowId={row => row.plantNo}/>
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