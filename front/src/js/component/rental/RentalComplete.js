import React from "react";
import './css/rentalcomplete.css';

function RentalComplete(){
    return(     
    <div className="background">
        <div className="rentalcom">
            <div>
            <button type='submit' className="button1">신청 내역 확인</button>
            </div>
            <div>
            <button type='button' value='취소' className="button2" >홈페이지돌아가기</button>
            </div>
        </div>
    </div>  
    );
}
export default RentalComplete;