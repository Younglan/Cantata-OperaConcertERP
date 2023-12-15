// import QEditor from "../component/QEditor";
import MainCompo1 from "../component/MainCompo1";
import MainCompo2 from "../component/MainCompo2";
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { isAfter } from 'date-fns'; //날짜 포맷팅을 위한 라이브러리
import "../../css/Main.css";
const SERVER_URL = 'http://localhost:8090';

const Main = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; //게시물이 10개 이상 넘어가면 다음 게시물로

    const goToCenterNews = () => {
        navigate("/센터소식");
    }

    useEffect(() => {
        // 게시글 목록 가져오기
        const fetchPost = async () => {
            try {
                const response = await fetch(`${SERVER_URL}/brd_posts/searchBrdNo/3`);//센터소식 게시판 가져오기
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                // 데이터가 존재하면 정렬 후 처리
                if (data && Array.isArray(data)) {
                    const postsWithBrdNo = data.map(post => ({
                        ...post,
                        brdNo: 3
                    }));
                    const sortedPosts = postsWithBrdNo
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

        fetchPost();
    }, []);

    useEffect(() => {
        //이벤트 베너 이미지 가져오기
        const fetchPost = async () => {
            try {
                const response = await fetch(`${SERVER_URL}/brd_posts/searchBrdNo/4`); // brdNo가 4인 게시글 가져오기
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                if (data && Array.isArray(data)) {
                    const filteredPosts = data.filter(post => (
                        post.postDeadline && isAfter(new Date(post.postDeadline), new Date())
                    ));

                    const sortedPosts = filteredPosts.reverse();
                    setPosts(sortedPosts);
                } else {
                    setPosts([]);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchPost();
    }, []);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPosts = posts.slice(startIndex, endIndex);

    return (
        // <div>
        //     <MainCompo1 />
        //     {/* <QEditor /> */}
        //     <MainCompo2 />
        // </div>
        <div id="Main">
            <div className="perfome">
                <div className="show">

                </div>
                <div className="show">

                </div>
                <div className="show">

                </div>
                <div className="show">

                </div>
            </div>
            <div className="notice">
                <div className="noticeHeader">
                    <h4>센터 소식</h4>
                    <h6 onClick={() => { goToCenterNews(); }}>더보기{'>>'}</h6>
                </div>
                <div className="mini">
                    {currentPosts
                    .filter(post => post.brdNo === 3)
                    .map((post, index) => (
                        <div key={index} className='postItem'>
                            <div className='postNumber'>{post.postNum}</div>
                            <Link to={`/postDetail/${post.postNo}`} className='postTitle'>{post.postTitle}</Link>
                            <div className='postDate'>{post.postDate}</div>
                            {/* 작성자 이름 추가 예정 */}
                        </div>
                    ))}
                </div>
            </div>
            <div className="eventBanner">
            {posts.length > 0 && (
                    <img src={`${SERVER_URL}/${posts[0].postFile1}`} alt="Banner Image" />
                )}
            </div>
        </div>
    );
};

export default Main;