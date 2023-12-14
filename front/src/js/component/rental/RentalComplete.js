import React from "react";
import './css/rentalcomplete.css';
import {useNavigate} from "react-router-dom";

function RentalComplete(){
    const navigate = useNavigate();
    const gorent = () => {
         navigate("/rentList");
    }

    const handleRedirect = () => {
        navigate(-1);
      };
    return(     
    <div className="background">
        <div className="rentalcom">
            <div>
            <button type='submit' className="button1" onClick={gorent}>신청 내역 확인</button>
            </div>
            <div>
            <button type='button' value='취소' className="button2" onClick={handleRedirect}>홈페이지돌아가기</button>
            </div>
        </div>
    </div>  
    );
}
export default RentalComplete;