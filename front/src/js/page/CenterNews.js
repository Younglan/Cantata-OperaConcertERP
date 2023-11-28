// 센터소개(공지사항)페이지
import React, { useState } from 'react'; 
import "../../css/CenterNews.css"
import Board from "../component/Board";
const CenterNews = () =>{

    const [BoardType, setBoardType] = useState(3);
    return(
        <div>
            {/* <Board BoardType = {BoardType}/> */}
            <Board/>
        </div>
    );
};
export default CenterNews;