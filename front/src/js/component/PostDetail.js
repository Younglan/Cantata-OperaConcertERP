// PostDetail.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../css/PostDetail.css';

const SERVER_URL = 'http://localhost:8090';

function PostDetail() {
  const { postNo } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/brd_posts/${postNo}`);
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
  }, [postNo]);

  return (
    <div className="post-detail-container">
      <h2 className="post-title">{post.postTitle}</h2>
      <div className="post-info">
        <span className="post-date">{post.postDate}</span>
      </div>
      <ReactQuill value={post.postSub || ''} theme="snow" readOnly={true} />
    </div>
  );
}

export default PostDetail;
