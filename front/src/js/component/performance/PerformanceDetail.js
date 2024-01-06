import React, { useEffect, useState } from 'react';
import { useNavigate,useParams  } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import './PerformanceDetail.css';
import { format } from 'date-fns';
import ko from "date-fns/locale/ko";

const SERVER_URL='http://localhost:8090';

function PerformanceDetail(){
    // pfCode : URL로부터 가져옴
    const { pfCode: pfCodeFromParams } = useParams();
    const [pfCode, setPfCode] = useState(pfCodeFromParams);
    const navigate = useNavigate();
    //데이터호출
    const[perform, setPerform] = useState([]);
    const[plant, setPlant] = useState([]);
    const[isAdmin, setIsAdmin] = useState(false);
    const[whatDetail, setWhatDetail] = useState([]);

    useEffect(() => {
        if (Object.keys(sessionStorage).length > 0) {
            // sessionStorage에 저장된 값이 하나 이상 있을 때의 처리
            const role = sessionStorage.getItem("role");
            if(role == 'ADMIN'){setIsAdmin(true)}
        } else {
            // sessionStorage에 저장된 값이 하나도 없을 때의 처리
            
        }
        fetchPerform();
        // 마운트될때 최상단 노출
        window.scrollTo(0, 0);
    }, []);

    const fetchPerform= () => {
        fetch(SERVER_URL+'/performances/'+pfCode)
        .then(response => response.json())
        .then(data => {
            setPerform(data);
            setWhatDetail(<p dangerouslySetInnerHTML={{ __html: data.pfNotice }} ></p>);
        })
        .catch(err => console.error(err));
        // http://localhost:8090/performances/3/plantNo
        fetch(SERVER_URL+'/performances/'+pfCode+'/plantNo')
        .then(response => response.json())
        .then(data => {setPlant(data);
        })
        .catch(err => {
            // console.error(err);
            navigate("/errorPage");
        });
        
    };

    const pfTimeManage = (pfCode) =>{
        const nowDate =new Date();
        const endDate = new Date(perform.pfEnd);
        if(endDate < nowDate){
            alert("과거에 종료 된 공연입니다.")
        }else{
            navigate("/timeList/"+pfCode);
        }
        
    };


    const ticketDetail = () =>{
        const todayDate = new Date();
        const formatDate = format(todayDate, 'yyyy-MM-dd', { locale: ko });
        if(formatDate > perform.pfEnd){
            alert('예매가능한 날짜가 없습니다.');
        }else{        
            navigate( '/ticket', {state:{perform:perform, pfcode:pfCode}} )
        }
    };

    const viewContent = (status) =>{
        if(status ==='notice'){
            setWhatDetail(<p dangerouslySetInnerHTML={{ __html: perform.pfNotice }} ></p>);
        }else if(status ==='explan'){
            setWhatDetail(<p dangerouslySetInnerHTML={{ __html: perform.pfExplan }} ></p>);
        }
        else if(status ==='refund'){
            setWhatDetail(<img src='https://storage.googleapis.com/cantata_opera/refund/ticketRefund.png' alt='Refund Information' />);
        }        
    }

    return(
        <div className='contentsArea'>
            <div className='contentsHeader'>
                <div className='performHeadLevel'>
                    
                    <div className='performHead performHeaderCon' id='performHeaderCon'>
                        <h1>[{perform.pfCate}] {perform.pfTitle}</h1>
                        <ul>
                            <li>
                                <span className='tit'>공연기간</span>
                                <span>{perform.pfStart} ~ {perform.pfEnd}</span>
                            </li>
                            <li>
                                <span className='tit'>장소</span>
                                <span>{plant.floor}층 / {plant.plantName}</span>
                            </li>
                            <li>
                                <span className='tit'>소요시간</span>
                                <span>{perform.pfRuntime}분</span>
                            </li>
                            <li>
                                <span className='tit'>좌석가격</span>
                                <span>R석 {perform.r}원 / S석 {perform.s}원 / A석 {perform.a}원 / B석 {perform.b}원 / C석 {perform.c}원 / D석 {perform.d}원</span>
                            </li>
                            <li>
                                <span className='tit'>주최</span>
                                <span>{perform.agency}</span>
                            </li>
                            <li>
                                <span className='tit'>문의처</span>
                                <span>{perform.agencyTel}</span>
                            </li>
                        </ul>
                        {isAdmin ? <p><Button  variant="secondary" onClick={() => pfTimeManage(pfCode)}>회차관리</Button>
                                    {/* <Button  variant="secondary" >내용수정</Button> */}
                                    </p>
                                    : null }
                        
                    </div>
                    <div className='performHead performHeaderImg' id='performHeaderImg'>
                        <img src={perform.pfPoster}></img>
                        <p><Button className='redButton' onClick={ticketDetail}>예매하기</Button></p>
                    </div>
                </div>
                    
            </div>
            <div className='contents'>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary" onClick={() => viewContent('notice')}>공연 공지사항</Button>
                    <Button variant="secondary" onClick={() => viewContent('explan')}>공연 정보</Button>
                    <Button variant="secondary" onClick={() => viewContent('refund')}>환불 안내</Button>
                </ButtonGroup>
                <div className='detailContent'>
                    {whatDetail}
                </div>
                    


        </div>
    </div>
    )
}

export default PerformanceDetail;