import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../css/PostDetail.css';

// import AddReply from './AddReply';

const SERVER_URL = 'http://localhost:8090';

function PostDetail() {
  const { postNo } = useParams(); //board.js에서 postNo값을 보내주고 링크의 postNo값을 가져온다.
  const [post, setPost] = useState({});
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; //게시물이 10개 이상 넘어가면 다음 게시물로
  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const postResponse = await fetch(`${SERVER_URL}/brd_posts/${postNo}`);
        if (!postResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const postData = await postResponse.json();
        setPost(postData);

        // 해당 글의 댓글만 가져오도록 수정
        const repliesResponse = await fetch(`${SERVER_URL}/replies/searchPostNo/${postNo}`);
        if (!repliesResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const repliesData = await repliesResponse.json();
        setReplies(Array.isArray(repliesData) ? repliesData : []);
      } catch (error) {
        console.error('Error fetching post detail:', error);
      }
    };

    fetchPostDetail();
  }, [postNo]);

  const handleReplyChange = (value) => {
    setNewReply(value);
  };

  const handleAddReply = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/replies/addReply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postNo: { postNo }, // postNo를 서버로 보냄
          repSub: newReply,
        }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok. Server response: ${await response.text()}`);
      }

      // 댓글이 추가되면 목록을 다시 불러와 갱신
      const updatedRepliesResponse = await fetch(`${SERVER_URL}/replies/searchPostNo/${postNo}`);
      if (!updatedRepliesResponse.ok) {
        throw new Error(`Network response was not ok. Server response: ${await updatedRepliesResponse.text()}`);
      }
      const updatedRepliesData = await updatedRepliesResponse.json();
      setReplies(Array.isArray(updatedRepliesData) ? updatedRepliesData : []);

      // 댓글 입력창 초기화
      setNewReply('');
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentreplies = replies.slice(startIndex, endIndex);
  return (
    <div id='PostDetail'>
      <div className="post-detail-container">
        <h2 className="post-title">{post.postTitle}</h2>
        <div className="post-info">
          <span className="post-date">{post.postDate}</span>
        </div>
        <ReactQuill value={post.postSub || ''} modules={{ toolbar: false }} theme="snow" readOnly className='customPost' />
        {/* 댓글 입력 폼 */}
        <div className="reply-form">
          <ReactQuill value={newReply} modules={{ toolbar: false }} onChange={handleReplyChange} theme="snow" />
          <button onClick={handleAddReply}>댓글 작성</button>
        </div>

        <div className="reply">
          <h3>댓글</h3>
          {/* <ReactQuill value = {replies.repSub || ''} modules = {{tollbar:false}} them = "snow" readOnly className = 'replies-container'/> */}
          {currentreplies.map((replies, index) => (
            <div key={index} className='repliesItem'>
              <ReactQuill value={replies.repSub || ''} modules={{ toolbar: false }} them="snow" readOnly className="repSub" />
              {/* 작성자 이름 추가 예정 */}
            </div>
          ))}

        </div>
        {/* 페이지네이션 추가 */}
        <div className="pagination">
          {Array.from({ length: Math.ceil(replies.length / pageSize) }, (_, index) => (
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

export default PostDetail;
