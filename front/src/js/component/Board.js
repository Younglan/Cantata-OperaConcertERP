import React, { useEffect, useState } from 'react';
import "../../css/Board.css";
import { useNavigate, Link } from "react-router-dom";

const SERVER_URL = 'http://localhost:8090';

function Board({ BoardType }) {
    const navigate = useNavigate();
    const [boardName, setBoardName] = useState('');
    const [posts, setPosts] = useState([]);
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
                setBoardName(data.brdName);
            } catch (error) {
                console.error('Error fetching brdName:', error);
            }
        };

        fetchBrdName();
    }, [BoardType]);


    useEffect(() => {
        // 게시글 목록 가져오기
        const fetchPost = async () => {
            try {
                const response = await fetch(`${SERVER_URL}/brd_posts/search/findByBrdNo?brdNo=brd_post/${BoardType}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                // 데이터가 존재하면 정렬 후 처리
                if (data._embedded && data._embedded.brd_posts) {
                    const sortedPosts = data._embedded.brd_posts
                        .sort((a, b) => b.postNo - a.postNo)
                        .map((post, index) => ({ ...post, postNumber: index + 1 }))
                        .reverse();//큰 수부터 정렬
                    setPosts(sortedPosts);
                } else {
                    // 데이터가 없는 경우 빈 배열로 설정
                    setPosts([]);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchPost();
    }, [BoardType]);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPosts = posts.slice(startIndex, endIndex);

    return (
        <div id="Board">
            <div className='background'>
                <div className="Board_title">
                    <h1>{boardName}</h1>
                    <button onClick={() => navigate(`/newPost/${BoardType}`)}>글쓰기</button>
                </div>
                <div className="brd_post">
                    <div className='BoardList'>
                        <div className='postList'>
                            <div className='postNumber'><h5>번호</h5></div>
                            <div className='postTitle'><h5>제목</h5></div>
                            <div className='postDate'><h5>등제일</h5></div>
                        </div>
                        {currentPosts.map((post, index) => (
                            <div key={index} className='postItem'>
                                <div className='postNumber'>{index + 1}</div>
                                <Link to={`/postDetail/${post.postNo}`} className='postTitle'>{post.postTitle} {post.postNo}</Link>
                                <div className='postDate'>{post.postDate}</div>
                                {/* 작성자 이름 추가 예정 */}
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
