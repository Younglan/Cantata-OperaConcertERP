import React, { useEffect, useState } from 'react';
import "../../css/Board.css";
import { useNavigate, Link } from "react-router-dom";
const SERVER_URL = 'http://localhost:8090';

function Board({ BoardType }) {
    const navigate = useNavigate();
    const [boardName, setBoardName] = useState('');
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; //게시물이 10개 이상 넘어가면 다음 게시물로


    useEffect(() => {
        // 게시판 이름 가져오기
        const fetchBrdName = async () => {
            try {
                const response = await fetch(`${SERVER_URL}/brd_divisions/${BoardType}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBoardName(data.brdName); //게시판 이름 저장
            } catch (error) {
                console.error('Error fetching brdName:', error);
            }
        };

        fetchBrdName();
    }, [BoardType]);


    useEffect(() => {
        fetchPost();
    }, [BoardType]);

        // 게시글 목록 가져오기
        const fetchPost = async () => {
            try {
                const response = await fetch(`${SERVER_URL}/brd_posts/searchBrdNo/${BoardType}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                // 데이터가 존재하면 정렬 후 처리
                if (data && Array.isArray(data)) {
                    const postsWithBrdNo = data.map(post => ({
                        ...post,
                        brdNo: { BoardType }
                    }));
                    const filterPost = data.filter((brd_post) => brd_post.postStatus === true)
                    const sortedPosts = postsWithBrdNo && filterPost
                        .reverse(); //큰 수부터 정렬
                    setPosts(sortedPosts);
                } else {
                    //데이터가 없는경우 빈 배열로 설정
                    setPosts([]);
                }
            } catch (err) {
                console.error(err);
            }
        };
        

    // 게시글 조회수 증가 함수
    const postView = async (postNo) => {
        try {
            await fetch(`${SERVER_URL}/brd_posts/postView/${postNo}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // console.log('View incremented successfully.');
        } catch (err) {
            console.error(err);
        }
    };


    const onDelClick = (postNo) => {
        const updatedSatusData = {postStatus : 'false'};
        if (window.confirm("정말로 해당 컨텐츠를 삭제하시겠습니까?")){
            fetch(SERVER_URL+'/brd_posts/'+postNo,
                 {method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        },
                    body: JSON.stringify(updatedSatusData)
                 })
            .then(response => {
                if(response.ok){
                    fetchPost();
                    setOpen(true);
                }else{
                    alert("잘못된 시도입니다!");
                }
                
        })
        .catch(err => console.error(err))
        }
        
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPosts = posts.slice(startIndex, endIndex);

    return (
        <div id="Board">
            <div className='background'>
                <div className="Board_title">
                    <h1>{boardName}</h1>
                    {BoardType != null && BoardType != 4 &&
                    <button onClick={() => navigate(`/newPost/${BoardType}`)}>글쓰기</button>
                    }
                    {BoardType === 4 &&
                    <button onClick={() => navigate(`/newEventPost/${BoardType}`)}>글쓰기</button>
                    }
                </div>
                <div className="brd_post">
                    <div className='BoardList'>
                        <div className='postList'>
                            <div className='postNumber'><h5>번호</h5></div>
                            <div className='postTitle'><h5>제목</h5></div>
                            <div className='postViews'><h5>조회수</h5></div>
                            <div className='postDate'><h5>등록일</h5></div>
                        </div>
                        {currentPosts.map((post, index) => (
                            <div key={index} className='postItem'>
                                <div className='postNumber'>{post.postNum}</div>
                                <Link to={`/postDetail/${BoardType}/${post.postNo}`} brdno = {BoardType} className='postTitle' onClick={() => postView(post.postNo)}>{post.postTitle}</Link>
                                <div className='postViews'>{post.postViews}</div>
                                <div className='postDate'>{post.postDate}</div>
                                {/* 작성자 이름 추가 예정 */}
                                <button onClick={() => onDelClick(post.postNo)}>삭제</button>
                            </div>
                        ))}
                    </div>
                </div>
                {/* 페이지네이션 추가 */}
                <div className="pagination">
                    {Array.from({ length: Math.ceil(posts.length / pageSize) }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={currentPage === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Board;
