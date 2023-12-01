// 센터소개(공지사항)페이지
import "../../css/CenterNews.css"
import Board from "../component/Board";
const CenterNews = () =>{

    return(
        <div>
            <Board BoardType = {3}/>{/* title에 센터 소개 띄우기 */}
        </div>
    );
};
export default CenterNews;