import React, { useEffect, useState } from 'react';
import { useNavigate,useParams  } from "react-router-dom";
import { DataGrid} from '@mui/x-data-grid';
// import DeleteIcon from '@mui/icons-material/Delete';
import './TimeList.css';
import dayjs from "dayjs";
import AddTime from './AddTime';
dayjs.locale("ko");

const SERVER_URL='http://localhost:8090';

// function CustomToolbar() {
//     return(
//         <GridToolbarContainer
//             className={gridClasses.toolbarContainer}>
//                 <GridToolbarExport />
//         </GridToolbarContainer>
//     );
// }

function TimeList(){
    // pfCode : URL로부터 가져옴
    const { pfCode: pfCodeFromParams } = useParams();
    const [pfCode, setPfCode] = useState(pfCodeFromParams);
    const [pfTitle, setPfTitle] = useState([]);
    const [pfStart, setPfStart] = useState([]);
    const [pfEnd, setPfEnd] = useState([]);
    const [pfRuntime, setPfRuntime] = useState([]);
    const [plantNo, setPlantNo] = useState([]);


    const navigate = useNavigate();
    //리다이렉션 핸들러
    const handleRedirect = () => {
        navigate(-1);
    };

    const [times, setTimes] = useState([]);
    const [open, setOpen] = useState(false);

    const columns = [ 
        {field: 'ptNo', headerName: '회차구분',headerAlign: 'center'}, 
        {field: 'pfCode', headerName: '공연제목',headerAlign: 'center',width: 300, 
            valueGetter: (params) => {
                const pfTitle = Array.isArray(params.row.pfCode) ? params.row.pfCode : [params.row.pfCode];
                return pfTitle.map((m) => m.pfTitle).join(', ');
            }
        }, 
        {field: 'ptDate', 
         headerName: '날짜', 
         width: 200, 
         headerAlign: 'center',
         valueFormatter: (params) => dayjs(params.value).format('YYYY-MM-DD A hh:mm'),
        }, 
        
        {field: '_links.self.href',
         headerName: '관리메뉴',
         sortable:false,
         filterable: false,
         headerAlign: 'center',
         renderCell: row =>
            <button onClick={() => onDelClick(row.id)}>삭제</button>
        }
    ];

    useEffect(() => {
        fetchTimeList();
        
    }, []);

    const fetchTimeList= () => {
        fetch(SERVER_URL+'/perform_times/pfTimeList/'+pfCode)
        .then(response => response.json())
        .then(data => {
            //상태 체크 후 pfStatus가 ture인것만 표시
            const filteredTimes 
                = data.filter((pfTimes) => pfTimes.ptStatus === true).reverse();
                setTimes(filteredTimes);
        })
        .catch(err => console.error(err));

        fetch(SERVER_URL+'/performances/'+pfCode)
        .then(response => response.json())
        .then(data => {
            setPfTitle(data.pfTitle);
            setPfStart(data.pfStart);
            setPfEnd(data.pfEnd);
            setPfRuntime(data.pfRuntime);
            
        })
        .catch(err => console.error(err));
    };

    const onDelClick = (ptNo) => {
        const updatedSatusData = {ptStatus : 'false'};
        if (window.confirm("정말로 해당 컨텐츠를 삭제하시겠습니까?")){
            fetch(SERVER_URL+'/perform_times/'+ptNo,
                 {method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        },
                    body: JSON.stringify(updatedSatusData)
                 })
            .then(response => {
                if(response.ok){
                    fetchTimeList();
                    setOpen(true);
                }else{
                    alert("잘못된 시도입니다!");
                }
                
        })
        .catch(err => console.error(err))
        }
        
    }
    const addTime = (time) =>{
        console.log(time);
        fetch(SERVER_URL+'/perform_times',
            {method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(time)
            }
        )
        .then(response => {
            if (response.ok){
                fetchTimeList();
                
            }
            else{
                alert('Somthing went wrong!');
            }
        })
        .catch(err => console.log(err))
    }

    if(times.length === 0 ){
        return(
            <React.Fragment>
                <div> 저장된 데이터가 없습니다. </div>
                <AddTime addTime={addTime} sendPfCode={pfCode} sendPfStart={pfStart} sendPfEnd={pfEnd} sendPfTitle={pfTitle} sendRunTime={pfRuntime}/>
                <button onClick={handleRedirect}>뒤로가기</button> 
            </React.Fragment>
        ) ;
    }

    return(
        <React.Fragment>
            
            <div>
                회차 리스트
                
                <DataGrid className='ptList'
                        rows={times} 
                        columns={columns}
                        disableRowSelectionOnClick={true}
                        getRowId={row => row.ptNo}/> 

                <AddTime addTime={addTime} sendPfCode={pfCode} sendPfStart={pfStart} sendPfEnd={pfEnd} sendPfTitle={pfTitle} sendRunTime={pfRuntime}/>
                <button onClick={handleRedirect}>뒤로가기</button> 
            </div>
        </React.Fragment>
    );
}


export default  TimeList;