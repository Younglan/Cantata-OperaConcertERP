import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './css/plantDetail.css';

const SERVER_URL='http://localhost:8090';

function PlantDetail(){
   
    const {plantNo: plantNoFromParams} = useParams();
    const [plantNo, setPlantNo] = useState(plantNoFromParams);
    const navigate = useNavigate();
    const[plant, setPlant] = useState([]);
    const [imageIndex, setImageIndex] = useState(0);
    const [imageURLs, setImageURLs] = useState([]);
    const token = sessionStorage.getItem("jwt");

  useEffect(() => {
    // 5초마다 이미지 변경
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % imageURLs.length);
    }, 5000);

    // 컴포넌트 언마운트 시 clearInterval로 메모리 누수 방지
    return () => clearInterval(interval);
    }, [imageIndex, imageURLs]);
    useEffect(() => {
        fetchPlant();
    },[plantNo]);

    const fetchPlant= () => {
        fetch(SERVER_URL+'/plants/'+plantNo)
        .then(response => response.json())
        .then(data => {
            setPlant(data);
            const newImageURLs = [
                data.plantMainimg,
                data.plantSubimg1,
                data.plantSubimg2
              ];
        
              setImageURLs(newImageURLs);
        })
        .catch(err => console.error(err));
    };

    const rentap = () =>{
        if (Object.keys(sessionStorage).length > 0) {
            // sessionStorage에 저장된 값이 하나 이상 있을 때의 처리
            const corp = sessionStorage.getItem("corp");
            console.log(corp);
            if(corp === 'true'){
              navigate("/RentApp");
            }else{
              alert("법인회원이 아닙니다.");
              navigate("/mypage");
            }
        } else {
          navigate("/RentApp");
        }        
    };

    return(
        <div className='plantsArea'>
            <div className='plantsHeader'>
                <div className='headLevel'>
                <div className='plantHead plantHeaderImg' id='plantHeaderImg'>
                         <img src={imageURLs[imageIndex]} alt={`Plant Image ${imageIndex + 1}`} />
                    </div>
                    
                    <div className='plantHead plantHeaderCon' id='plantHeaderCon'>
                        <h1>{plant.plantName}</h1>
                        <ul>
                            <li>
                                <span className='tit'>층수/수용인원:</span>
                                <span>{plant.floor}층 / {plant.capacity}명</span>
                            </li>
                            <li>
                                <span className='tit'>부대시설:</span>
                                <span>{plant.plantSub}</span>
                            </li>
                        </ul>
                        <div className='pldetailContent'>
                            <p dangerouslySetInnerHTML={{ __html: plant.plantDetail }} ></p>
                        </div>
                        {/* <p><Button  variant="secondary" onClick={() => pfTimeManage(pfCode)}>회차관리</Button><Button  variant="secondary" >내용수정</Button></p> */}
                        <p><Button className='redButton' onClick={rentap}>대관신청</Button></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlantDetail;