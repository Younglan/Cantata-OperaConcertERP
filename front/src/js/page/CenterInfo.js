import React, { useEffect, useState } from 'react';
import "../../css/CenterInfo.css";

const SERVER_URL = 'http://localhost:8090';

const CenterInfo = () => {
    const [post, setPost] = useState({});
    const [centerInfo, setCenterInfo] = useState([]);

    const fetchPostDetail = async () => {
        try {
            const postResponse = await fetch(`${SERVER_URL}/brd_posts/latest/1`);
            if (!postResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const postData = await postResponse.json();
            setPost(postData);
            setCenterInfo(<p dangerouslySetInnerHTML={{ __html: postData.postSub }} ></p>);

        } catch (error) {
            console.error('Error fetching post detail:', error);
        }
    };


    useEffect(() => {
        // fetchLastPostNo();
        fetchPostDetail();
    })

    return (
        <div className="Background">
            <div className="textground">
                <div className="title">
                    <h1>"센터소개"</h1>
                </div>
                <div className='postSub'>
                    <div className="image">
                        <img src={post.postFile1} />
                    </div>
                    <div className="text">
                        <h5>{centerInfo}</h5>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default CenterInfo;
