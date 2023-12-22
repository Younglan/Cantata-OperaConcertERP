import React, { useEffect, useState, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Snackbar } from '@mui/material';
function PlantList(){

    const[Plant, setPlant] = useState([]);
    const [open, setOpen] = useState(false);
    const Plantcolumns = [ 

        {field: 'plantName', headerName: '신청인명',headerAlign: 'center'}, 

        {field: 'plantUse', headerName: '시작날짜', width: 150,headerAlign: 'center'
        }, 

        {field: 'plantDetail', headerName: '종료날짜', width: 150,headerAlign: 'center'
       }, 

        {field: 'capacity', headerName: '신청날짜', width: 150,headerAlign: 'center'
        }, 
        {field: 'plantCharge', headerName: '신청날짜', width: 150,headerAlign: 'center'
        },
        {field: 'plantSub', headerName: '신청날짜', width: 150,headerAlign: 'center'
        },
        {field: 'floor', headerName: '신청날짜', width: 150,headerAlign: 'center'
        },
        {field: 'capacity', headerName: '신청날짜', width: 150,headerAlign: 'center'
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
                <DataGrid className='rentList'
                    rows={Plant}
                    columns={Plantcolumns}
                    disableRowSelectionOnClick={true}
                    getRowId={row => row.rentNo}/>
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