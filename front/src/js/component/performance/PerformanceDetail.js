import React, { useEffect, useState } from 'react';
import { useNavigate,useParams  } from "react-router-dom";
import './PerformanceDetail.css';

const SERVER_URL='http://localhost:8090';

function PerformanceDetail(){
    // pfCode : URL로부터 가져옴
    const { pfCode: pfCodeFromParams } = useParams();
    const [pfCode, setpfCode] = useState(pfCodeFromParams);
    const navigate = useNavigate();
    //데이터호출
    const[perform, setPerform] = useState([]);

    useEffect(() => {
        fetchPerform();
    }, []);

    const fetchPerform= () => {
        fetch(SERVER_URL+'/performances/'+pfCode)
        .then(response => response.json())
        .then(data => {setPerform(data);
        })
        .catch(err => console.error(err));
    };

    const pfTimeManage = (pfCode) =>{
        navigate("/timeList/"+pfCode);
    };

    return(
    <div className='contentsArea'>
        <div className='contentsHeader'>
            <h1>{perform.pfTitle}</h1>
            <div>
            a
            a
            a
            a
            a
            a
            a
            aaa</div>

            <button>예매하기</button>
            <button onClick={() => pfTimeManage(pfCode)}>회차관리</button>                    
        </div>
        <div className='contents'>
                
                <p>{perform.pfCate}</p>
                <p>{perform.agency}</p>
                <p>{perform.agencyTel}</p>
                <p>{perform.pfPoster}</p>
                <p>{perform.pfEximg}</p>
                <p>{perform.pfExplan}</p>
                <p dangerouslySetInnerHTML={{ __html: perform.pfNotice }} ></p>
                <p>{perform.pfStart}</p>
                <p>{perform.pfEnd}</p>
                <p>{perform.pfRuntime}</p>
                <p>{perform.r}</p>
                <p>{perform.s}</p>
                <p>{perform.a}</p>
                <p>{perform.b}</p>
                <p>{perform.c}</p>
                <p>{perform.d}</p>


        </div>
    </div>
    )
}

export default PerformanceDetail;