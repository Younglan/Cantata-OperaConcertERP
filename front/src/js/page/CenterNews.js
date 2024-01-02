// 센터소개(공지사항)페이지
import React from "react";
import "../../css/CenterNews.css"
import Board from "../component/Board";
const CenterNews = () =>{

    return(
        <React.Fragment>
            <Board BoardType = {3}/>{/* title에 센터 소개 띄우기 */}
        </React.Fragment>
    );
};
export default CenterNews;