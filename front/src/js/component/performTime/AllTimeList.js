import React, { useEffect, useState } from 'react';
import { useNavigate,useParams  } from "react-router-dom";
import { DataGrid} from '@mui/x-data-grid';
import { Snackbar } from "@mui/material";
import './TimeList.css';
import dayjs from "dayjs";
import "dayjs/locale/ko";
import AddAllTime from './AddAllTime';
dayjs.locale("ko");

const SERVER_URL='http://localhost:8090';

function AllTimeList(){
    // pfCode : URL로부터 가져옴
    const { pfCode: pfCodeFromParams } = useParams();
    const [pfCode, setPfCode] = useState(pfCodeFromParams);
    const [pfTitle, setPfTitle] = useState([]);
    const [pfStart, setPfStart] = useState([]);
    const [pfEnd, setPfEnd] = useState([]);
    const [pfRuntime, setPfRuntime] = useState([]);
    const [plantNo, setPlantNo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);


    const navigate = useNavigate();
    //리다이렉션 핸들러
    const handleRedirect = () => {
        navigate(-1);
    };

    const [times, setTimes] = useState([]);
    const [open, setOpen] = useState(false);

    const columns = [ 
        {field: 'ptNo', headerName: '등록번호',headerAlign: 'center',align: 'center'}, 
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
         align: 'center',
         valueFormatter: (params) => dayjs(params.value).format('YYYY-MM-DD A hh:mm'),
        }, 
        
        {field: '_links.self.href',
         headerName: '관리메뉴',
         sortable:false,
         filterable: false,
         headerAlign: 'center',
         align: 'center',
         renderCell: row =>
            <button className='inGrayButton'onClick={() => onDelClick(row.id)}>삭제</button>
        }
    ];

    useEffect(() => {
        fetchTimeList();     
    }, [currentPage, pageSize]);

    const fetchTimeList= () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        fetch(SERVER_URL+'/perform_times/allTimeList')
        .then(response => response.json())
        .then(data => {
            //상태 체크 후 pfStatus가 ture인것만 표시
            const filteredTimes 
                = data.filter((pfTimes) => pfTimes.ptStatus === true).reverse();
                setTotalPages(Math.ceil(filteredTimes.length / pageSize));
                setTimes(filteredTimes.slice(startIndex, endIndex));
        })
        .catch(err => {
            // console.error(err);
            navigate("/errorPage");
        });

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
            .catch(err => {
                console.error(err);
                navigate("/errorPage");
            });
        }
        
    }
    const addTime = (time) =>{
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
        .catch(err => {
            navigate("/errorPage");
        });
    }

    const renderPageButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
          buttons.push(
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={currentPage === i ? 'activeButton' : ''}
            >
              {i}
            </button>
          );
        }
        return buttons;
      };   

    if(times.length === 0 ){
        return(
            <React.Fragment>
                <h3 className='contentH3'> 저장된 데이터가 없습니다. </h3>
                <AddAllTime addTime={addTime} sendPfCode={pfCode} sendPfStart={pfStart} sendPfEnd={pfEnd} sendPfTitle={pfTitle} sendRunTime={pfRuntime} sendPlantNo={plantNo}/>
                <button className='grayButton' onClick={handleRedirect}>뒤로가기</button> 
            </React.Fragment>
        ) ;
    }

    return(
        <React.Fragment>
            
            <div className='ptContent'>
                <h3 className='contentH3'> 회차리스트 </h3>
                
                <DataGrid className='ptList'
                        rows={times} 
                        columns={columns}
                        disableRowSelectionOnClick={true}
                        getRowId={row => row.ptNo}/> 
                {/* 페이징버튼 */}
                <div className="pagination">
                    {/* 가장 첫 페이지로 */}
                    {currentPage > 1 && (
                        <>
                            <button onClick={() => setCurrentPage(1)}>{"<<"}</button>
                            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>{"<"}</button>
                        </>
                    )}

                    {renderPageButtons()}

                    {currentPage < totalPages && (
                        <>
                            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>{">"}</button>
                            <button onClick={() => setCurrentPage(totalPages)}>{">>"}</button>
                        </>
                    )}
                </div>
                <AddAllTime className='redButton'addTime={addTime}/>
                <button  className='grayButton' onClick={handleRedirect}>뒤로가기</button> 
            </div>
        </React.Fragment>
    );
}


export default  AllTimeList;