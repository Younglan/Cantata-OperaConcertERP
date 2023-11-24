import "../../css/Board.css";

const Board = () => {

    return(
    <div id="Board">
        <div className="Board_title">
            {/* 얘도 마리아DB와 연동해서 게시판 이름 알아야함 */}
        </div>
        <div className="brd_post">
            <div className="post_num">

            </div>
            <div className="post_title">

            </div>
            <div className="post_date">

            </div>
            <div className="post_writer">

            </div>
        </div>
        <div className = "line"></div>{/* 이름 그대로 선 긋는 용도 */}
        <div>
            {/* crud...도전!!!!! */}
        </div>
    </div>
    );
};
export default Board;