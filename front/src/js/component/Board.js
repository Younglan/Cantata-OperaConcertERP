import React, { useEffect, useState } from 'react';
import "../../css/Board.css";

const Board = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8090/api/brd_divisions')
            .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP error! Status: ${response.status}');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    return (
        <div id="Board">
            <div className='background'>
                {data.map(brd => (
                    <div className="Board_title" key={brd.no}>
                        <h2>{brd.name}</h2>
                        {/* 얘도 마리아DB와 연동해서 게시판 이름 알아야함 */}
                    </div>
                ))}
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
                    {/* crud...도전!!!!! */}
                </div>
            </div>
        </div>
    );
};
export default Board;