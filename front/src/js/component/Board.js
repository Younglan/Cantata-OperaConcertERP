import React, { useEffect, useState } from 'react';
import "../../../css/Board.css";
import { useNavigate, Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { parseJwt } from '../../../loginUtil';
const SERVER_URL = 'http://localhost:8090';

const Board = (props) => {
    const navigate = useNavigate();
    const { BrdType } = useParams();
    const BoardType = props.BoardType || BrdType; // props로 BoardType을 받지 않았을 때 useParams() 사용
    const [boardName, setBoardName] = useState('');
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const pageSize = 10; //게시물이 10개 이상 넘어가면 다음 게시물로
    const maxPageButtons = 10;// 페이징 버튼을 보여줄 최대 개수

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
        if (Object.keys(sessionStorage).length > 0) {
            // sessionStorage에 저장된 값이 하나 이상 있을 때의 처리
            const role = sessionStorage.getItem("role");
            const token = sessionStorage.getItem('jwt');
            setUserId(parseJwt(token));
            if (role === 'ADMIN') { setIsAdmin(true) }
            else if(role === 'USER'){setIsUser(true)}
        } else {
            // sessionStorage에 저장된 값이 하나도 없을 때의 처리
        }

    }, [isAdmin][isUser]);


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
        const updatedSatusData = { postStatus: 'false' };
        if (window.confirm("정말로 해당 컨텐츠를 삭제하시겠습니까?")) {
            fetch(SERVER_URL + '/brd_posts/' + postNo,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedSatusData)
                })
                .then(response => {
                    if (response.ok) {
                        fetchPost();
                        setOpen(true);
                    } else {
                        alert("잘못된 시도입니다!");
                    }

                })
                .catch(err => console.error(err))
        }

    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPosts = posts.slice(startIndex, endIndex);

    // 페이징 버튼을 렌더링하는 함수
    const renderPageButtons = () => {
        const totalPages = Math.ceil(posts.length / pageSize);

        // 현재 페이지를 중심으로 좌우로 maxPageButtons 개수만큼 버튼을 표시
        let startPage = Math.max(currentPage - Math.floor(maxPageButtons / 2), 1);
        let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

        // 만약 endPage가 maxPageButtons만큼 되기 전에는 startPage를 조정
        if (endPage - startPage + 1 < maxPageButtons) {
            startPage = Math.max(endPage - maxPageButtons + 1, 1);
        }

        const buttons = [];
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={currentPage === i ? 'active' : ''}
                >
                    {i}
                </button>
            );
        }

        return buttons;
    };

    return (
        <div id="Board">
            <div className='background'>
                <div className="Board_title">
                    <h1>{boardName}</h1>
                
                {(isAdmin || (BoardType == '6' && isUser)) && (
                        <div id='newPost'>
                            {BoardType != '4' && BoardType != '1' &&
                                <button className="new" onClick={() => navigate(`/newPost/${BoardType}`)}>글쓰기</button>
                            }
                            {BoardType == '4' &&
                                <button className="new" onClick={() => navigate(`/newEventPost/${BoardType}`)}>글쓰기</button>
                            }
                            {BoardType == '1' &&
                                <button className="new" onClick={() => navigate(`/newCenterInfo/${BoardType}`)}>글쓰기</button>
                            }
                        </div>
                    )}
                    </div>
                <div className="brd_post">
                    <div className='BoardList'>
                        <div className='postList'>
                            <div className='postNumber'><h5>번호</h5></div>
                            <div className='postTitle'><h5>제목</h5></div>
                            <div className='postViews'><h5>조회수</h5></div>
                            <div className='postDate'><h5>등록일</h5></div>
                            <div className='userName'><h5>작성자</h5></div>
                            {isAdmin &&(
                                <div className='deleteBtn'><h5>삭제</h5></div> 
                            )}
                        </div>
                        {currentPosts.map((post, index) => (
                            <div key={index} className='postItem'>
                                <div className='postNumber'>{post.postNum}</div>
                                <Link to={`/postDetail/${BoardType}/${post.postNo}`} brdno={BoardType} className='postTitle' onClick={() => postView(post.postNo)}>{post.postTitle}</Link>
                                <div className='postViews'>{post.postViews}</div>
                                <div className='postDate'>{post.postDate}</div>
                                <div className='userName'>{post.id.username}</div>
                                {/* 작성자 이름 추가 예정 */}
                                {isAdmin && (
                                    <div className='deleteBtn'>
                                        <button onClick={() => onDelClick(post.postNo)}>삭제</button>
                                    </div>
                            )}
                            </div>    
                        ))}
                    </div>
                </div>
                {/* 페이징버튼 */}
                <div className="pagination">
                    {/* 가장 첫 페이지로 */}
                    {currentPage > 1 && (
                        <>
                            <button onClick={() => setCurrentPage(1)}>{"<<"}</button>
                            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>{"<"}</button>
                        </>
                    )}

                    {renderPageButtons()}
                    {currentPage < Math.ceil(posts.length / pageSize) && (
                        <>
                            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(posts.length / pageSize)))}>{">"}</button>
                            <button onClick={() => setCurrentPage(Math.ceil(posts.length / pageSize))}>{">>"}</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Board;
