import React, { useEffect, useState } from 'react';
import { useNavigate,useParams  } from "react-router-dom";

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

    const ticketDetail = () =>{
        navigate( '/ticket', {state:{perform:perform, pfcode:pfCode}} )
    };
    return(
        <div className='contentsArea'>
            <div className='contents'>
                <h1>{perform.pfTitle}</h1>
                <button onClick={ticketDetail}>예매하기</button>
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