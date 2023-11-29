import React, { useEffect, useState } from 'react';
import "../../css/Board.css";

const SERVER_URL='http://localhost:8090';

function Board() {
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        fetch(SERVER_URL + '/brd_divisions', {method : "GET"})
            .then(response => response.json())
            .then(data => setBoards(data._embedded.brd_divisions))
            .catch(err => console.error(err));
    }, []);

    return (
        <div id="Board">
            <div className='background'>
                    <div className="Board_title">
                       {boards.map((brd_division) =>(
                        <h2 key = {3}>{brd_division.brdName}</h2>
                        ))}
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
                <div className="line"></div>{/* 이름 그대로 선 긋는 용도 */}
                <div>

                </div>
            </div>
        </div>
    );
};
export default Board;