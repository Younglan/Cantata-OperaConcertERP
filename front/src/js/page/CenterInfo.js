import React, { useEffect, useState } from 'react';
import "../../css/CenterInfo.css";

const SERVER_URL = 'http://localhost:8090';

const CenterInfo = () => {

    const [postData, setPostData] = useState({});

    useEffect(() => {
        // 서버에서 데이터 가져오기
        fetch(`${SERVER_URL}/brd_posts/getPostData`)
            .then(response => response.json())
            .then(data => setPostData(data))
            .catch(error => console.error(error));
    }, []);

    const separateImageAndText = (combinedData) => {
        //Data가 없는 경우 빈 객체 반환
        if(!combinedData){
            return{
                imageData: null,
                textData: null
            };
        }

        //BLOB 필드에서 데이터를 읽고 이미지와 텍스트 분리
        const parts = combinedData.split('|||'); //|||기준으로 분리

        //parts[0] = 이미지, parts[1] = 텍스트
        return{
            imageData: parts[0] || null, //이미지반환
            textData: parts[1] || null//텍스트 반환
        };
    };
    
    const {imageData, textData} = separateImageAndText(postData.postSub);

    return (
        <div className="Background">
            <div className="textground">
                <div className="title">
                    <h1>"센터소개"</h1>
                </div>
                <div className='postSub'>
                    <div className="image">
                        {imageData && <img src={SERVER_URL + imageData} alt = "센터 이미지"/>}
                    </div>
                    <div className="text">
                        {textData && <p>{textData}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CenterInfo;