import React, { useRef, useState, useMemo, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../../css/NewPost.css';
import { parseJwt } from '../../../loginUtil';
//QuillEditor
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const SERVER_URL = 'http://localhost:8090';

function NewCenterInfo(props) {
    //네비게이터
    const navigate = useNavigate();
    const [validationError, setValidationError] = useState(false); //유동성 검사
     // 연결된 파일 번호 리스트
     const [filesNumbers, setFilesNumbers] = useState([]);
     const [imageLoading, setImageLoading] = useState(false);
     // 파일의 SRC와 번호를 매핑한 객체
     const [fileSrcToNumberMap, setFileSrcToNumberMap] = useState({});
     const [userId, setUserId] = useState('');
    // const [open, setOpen] = useState(false);

    useEffect(() => {
        if (Object.keys(sessionStorage).length > 0) {
            // sessionStorage에 저장된 값이 하나 이상 있을 때의 처리
            const token = sessionStorage.getItem('jwt');
            setUserId(parseJwt(token));
        } else {
            // sessionStorage에 저장된 값이 하나도 없을 때의 처리
        }

    });

    const [post, setPost] = useState({
        postTitle : '',
        // postFile1 : '',
        postSub : '',
        brdNo : 1,
        id : ''
    });
    const [postSub, setPostSub] = React.useState('');
    // const [selectedBrdNo, setSelectedBrdNo] = useState(null);

    //리다이렉션 핸들러
    const handleRedirect = () => {
        navigate(-1);
    };

    // 폼의 input 값 변경 핸들러
    const handleChange = (event) => {
        setPost({
            ...post,
            [event.target.name]: event.target.value
        });
    }

    // Quill 에디터의 컨텐츠 변경 핸들러 (이미지 태그가 제거될 경우 관련 파일 번호도 제거)
    const handleQuillChange = (postSubValue) => {
        setPostSub(postSubValue);
        setPost(prevState => ({ ...prevState, postSub: postSubValue }));

        const imgTagPattern = /<img [^>]*src="([^"]+)"[^>]*>/g;
        const currentSrcs = [];
        let match;
        while (match = imgTagPattern.exec(postSubValue)) {
            currentSrcs.push(match[1]);
        }

        const missingSrcs = Object.keys(fileSrcToNumberMap).filter(src => !currentSrcs.includes(src));
        const missingFileNumbers = missingSrcs.map(src => fileSrcToNumberMap[src]);

        setFilesNumbers(prevNumbers => prevNumbers.filter(num => !missingFileNumbers.includes(num)));

        setFileSrcToNumberMap(prevMap => {
            missingSrcs.forEach(src => delete prevMap[src]);
            return { ...prevMap };
        });
    };

    // Quill 에디터에 이미지를 삽입하는 함수
    function insertToEditor(url) {
        if (quillRef1.current) {
            const editor = quillRef1.current.getEditor();
            const range = editor.getSelection();
            editor.insertEmbed(range ? range.index : 0, 'image', url);
        }
        else if (quillRef2.current) {
            const editor = quillRef2.current.getEditor();
            const range = editor.getSelection();
            editor.insertEmbed(range ? range.index : 0, 'image', url);
        }
    }

   

    //<QuillEditor> 옵션에 상응하는 포맷, 추가해주지 않으면 text editor에 적용된 스타일을 볼수 없음
    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "align",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "background",
        "color",
        "image",
        "width",
    ];

    const validateForm = () => { //제목 또는 내용의 유효성 검사
        return !(!post.postTitle.trim() || !post.postSub.trim()); //trim()은 공백 제거, 만약 postTitle, postSub중 하나라도 비어있다면 !에 따라 true를 그리고 이중 !에 따라 false를 리턴한다.
    };

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    ["blockquote"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ color: [] }, { background: [] }],
                    [{ align: [] }],
                ]
            }
        };
    }, []);
    
    //<QuillEditor> quill 에디터 컴포넌트 ref
    const quillRef1 = useRef(null);
    const quillRef2 = useRef(null);

    //새로운 글 등록
    function newPostSave() {
        const isValid = validateForm();
        if (isValid) {
            setValidationError(false);
            var postFile1Element = document.getElementById("postFile1");
            var formData = new FormData();
            formData.append("postFile", postFile1Element.files[0]);
            formData.append('post', JSON.stringify({
                ...post,
                // postNum: data + 1, // 마지막 postNum + 1
                brdNo: 1,
                id: `${userId}`
            }));

            fetch(`${SERVER_URL}/brd_posts/newEventPost`, {
                method: 'POST',
                // headers: { 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundarythWrULFMIbQmqSPH' },
                body: formData
            })
                .then(response => {
                    if (response.ok) {
                        alert('저장완료.');
                        navigate(-1);
                    } else {
                        alert('저장되지않았습니다.');
                    }
                })
                .catch(err => console.error(err))
        } else {
            setValidationError(true);
        }
    }
    return (
        <div className='contentsArea'>
            <div className='contents'>
                {/* <form> */}
                <div>
                    <h1>센터소개</h1>
                </div>
                <div className="divrows">
                    <div className="formHeader">제&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;목</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder="" className="fullwidth" name="postTitle" value={post.postTitle} onChange={handleChange} />
                    </div>
                </div>  
                <div className="divrows">
                    <div className="formHeader">포스터&nbsp;&nbsp;파일</div>
                    <div className="divcolscont">
                        <Form.Control type="file" id="postFile1" name="postFile1"/>
                    </div>
                </div>
                <div className="divrows formTxtArea">
                    <div className="formHeader">글&nbsp;&nbsp;쓰&nbsp;&nbsp;기</div>
                    <div className="divcolscont">
                        <ReactQuill
                            ref={quillRef1}
                            value={postSub}
                            theme="snow"
                            modules={{
                                ...modules,
                            }}
                            formats={formats}
                            preserveWhitespace
                            onChange={handleQuillChange}
                            className="customQuill"
                        ></ReactQuill>
                    </div>
                </div>
                <div className="divrows formTxtArea">
                <Button onClick={newPostSave} variant="secondary" disabled={!validateForm()}>등록</Button> &nbsp;
                    <Button onClick={handleRedirect} variant="secondary">뒤로가기</Button>
                </div>

                {/* </form> */}
            </div>

        </div>

    )
};

export default NewCenterInfo;
