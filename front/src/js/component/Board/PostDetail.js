import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import { parseJwt } from '../../../loginUtil';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from 'react-bootstrap';
import '../../../css/PostDetail.css';

// import AddReply from './AddReply';

const SERVER_URL = 'http://localhost:8090';

function PostDetail() {
  const navigate = useNavigate();
  const { postNo } = useParams(); //board.js에서 postNo값을 보내주고 링크의 postNo값을 가져온다.
  const { BoardType } = useParams();
  const [post, setPost] = useState({});
  const [userId, setUserId] = useState('');
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; //게시물이 10개 이상 넘어가면 다음 게시물로
  const maxPageButtons = 10; // 페이징 버튼을 보여줄 최대 개수
  const [isAdmin, setIsAdmin] = useState(false);
  const [, setValidationError] = useState(false) //댓글 유동성 검사
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleToggleReplyForm = () => {
    setShowReplyForm((prev) => !prev);
  };
  useEffect(() => {
    if (Object.keys(sessionStorage).length > 0) {
      // sessionStorage에 저장된 값이 하나 이상 있을 때의 처리
      const role = sessionStorage.getItem("role");
      const token = sessionStorage.getItem('jwt');
      setUserId(parseJwt(token));
      if (role === 'ADMIN') { setIsAdmin(true) }
    } else {
      // sessionStorage에 저장된 값이 하나도 없을 때의 처리
    }

  }, [isAdmin]);

  useEffect(() => {
    fetchPostDetail();
  }, [postNo]);

  const fetchPostDetail = async () => {
    try {
      const postResponse = await fetch(`${SERVER_URL}/brd_posts/searchPostNo/${postNo}`);
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

  const validateForm = () => { //제목 또는 내용의 유효성 검사
    return newReply.trim() !== ''; //trim()은 공백 제거, 만약 postTitle, postSub중 하나라도 비어있다면 !에 따라 true를 그리고 이중 !에 따라 false를 리턴한다.
  };


  const handleReplyChange = (value) => {
    setNewReply(value);
  };

  const handleAddReply = async () => {
    const isValid = validateForm();
    if (isValid) {
      setValidationError(false);
      try {
        const response = await fetch(`${SERVER_URL}/replies/addReply`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            postNo: { postNo }, // postNo를 서버로 보냄
            repSub: newReply,
            id: { id: userId }
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
      setShowReplyForm((prev) => !prev);
    } else {
      setValidationError(true);
    }
  };
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentreplies = replies.slice(startIndex, endIndex);

  // 댓글페이징 버튼을 렌더링하는 함수
  const renderPageButtons = () => {
    const totalPages = Math.ceil(replies.length / pageSize);

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
            fetchPostDetail();
            // setOpen(true);
            navigate(-1);
          } else {
            alert("잘못된 시도입니다!");
          }

        })
        .catch(err => console.error(err))
    }

  }


  return (
    <div id='PostDetail'>
      <div className="postDetailContainer">
        <h2 className="post-title">{post.postTitle}</h2>
        <div className="post-info">
          <span className="post-date"> 작성일 | {post.postDate} 작성자 | {post.id ? post.id.username : '익명'}</span>
          {(isAdmin || (post.id && userId === post.id.id)) && (
            <div id="Edit">
              {BoardType !== '4' && (
                <button onClick={() => navigate(`/EditPost/${BoardType}/${postNo}`)}>수정</button>
              )}
              {BoardType === '4' && (
                <button onClick={() => navigate(`/EditEventPost/${BoardType}/${postNo}`)}>수정</button>
              )}
              <button className='del' onClick={() => onDelClick(post.postNo)}>삭제</button>
            </div>
          )}
        </div>
        <ReactQuill value={post.postSub || ''} modules={{ toolbar: false }} theme="snow" readOnly className='customPost' />

        {BoardType === '6' && (
          <div id="Reply">
            <h2>답변 & 추가질문</h2>
            {(isAdmin || (post.id && userId === `${post.id.id}`)) && (
              //댓글 입력 폼
              <div className="reply-header">
                <button className="ReplyButton" onClick={handleToggleReplyForm}>
                  {showReplyForm ? 'x' : '댓글 작성'}
                </button>
                {showReplyForm && (
                  <div className="reply-form">
                    <ReactQuill
                      value={newReply}
                      modules={{ toolbar: false }}
                      onChange={handleReplyChange}
                      theme="snow"
                    />
                    <Button className="ReplyButton" onClick={handleAddReply} variant="secondary" disabled={!validateForm()}>올리기</Button>
                  </div>
                )}
              </div>
            )}
            <div className="reply">
              {currentreplies.map((reply, index) => (
                <div key={index} className="repliesItem">
                  <div className="repName">
                    {reply.id.username}
                  </div>
                  <div className="repDate">
                    {reply.repDate}
                  </div>
                  <div className="repSub">
                    <div dangerouslySetInnerHTML={{ __html: reply.repSub || '' }} />
                  </div>
                  {/* 작성자 이름 추가 예정 */}
                </div>
              ))}
            </div>
            {/* 댓글 페이지네이션 추가 */}
            <div className="pagination">
              {/* 가장 첫 페이지로 */}
              {currentPage > 1 && (
                <>
                  <button onClick={() => setCurrentPage(1)}>{"<<"}</button>
                  <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>{"<"}</button>
                </>
              )}

              {renderPageButtons()}
              {currentPage < Math.ceil(replies.length / pageSize) && (
                <>
                  <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(replies.length / pageSize)))}>{">"}</button>
                  {/* 가장 마지막 페이지로 */}
                  <button onClick={() => setCurrentPage(Math.ceil(replies.length / pageSize))}>{">>"}</button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div >
  );
}

export default PostDetail;
