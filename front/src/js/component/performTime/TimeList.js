import React, { useEffect, useState } from 'react';
import { useNavigate,useParams  } from "react-router-dom";

function TimeList(){
    const navigate = useNavigate();
    //리다이렉션 핸들러
    const handleRedirect = () => {
        navigate(-1);
    };

    return(
        <div>
            회차 리스트
            <button  onClick={handleRedirect}>뒤로가기</button> 
        </div>
    );
}


export default  TimeList;