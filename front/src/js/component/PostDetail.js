// PostDetail.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../css/PostDetail.css';

const SERVER_URL = 'http://localhost:8090';

function PostDetail() {
  const { postNum } = useParams(); //board.js에서 postNum값을 보내주고 링크의 postNum값을 가져온다.
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/brd_posts/${postNum}`); //{postNum}으로 되어있지만 사실상 postNum과 같은 값을 가지고있는 primaryKey값인 postNo의 값으로 글을 불러온다.
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post detail:', error);
      }
    };

    fetchPostDetail();
  }, [postNum]);

  return (
    <div className='contentsArea'>
      <div className="post-detail-container">
        <h2 className="post-title">{post.postTitle}</h2>
        <div className="post-info">
          <span className="post-date">{post.postDate}</span>
        </div>
        <ReactQuill value={post.postSub || ''} modules = {{toolbar: false}} theme="snow" readOnly className='customQuill'/>
      </div>
    </div>
  );
}

export default PostDetail;
