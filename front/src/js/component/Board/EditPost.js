import React, { useRef, useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../../css/NewPost.css';
//QuillEditor
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";

Quill.register("modules/imageResize", ImageResize);
const SERVER_URL = 'http://localhost:8090';

function EditPost(props) {
    const { postNo } = useParams();
    const [postTitle, setPostTitle] = useState('');
    const [postSub, setPostSub] = useState('');
    // const [boardName, setBoardName] = useState('');
    //네비게이터
    const navigate = useNavigate();
     // 연결된 파일 번호 리스트
     const [filesNumbers, setFilesNumbers] = useState([]);
     const [imageLoading, setImageLoading] = useState(false);
     // 파일의 SRC와 번호를 매핑한 객체
     const [fileSrcToNumberMap, setFileSrcToNumberMap] = useState({});
    // const [open, setOpen] = useState(false);
    

    const [post, setPost] = useState({
        postTitle : '',
        postSub : '',
        postDeadline : '',
        brdNo : '',
        id: ''
    });
    
  
    useEffect(() => {
        // 게시글 이름 가져오기
        const fetchPost = async () => {
            try {
                const response = await fetch(`${SERVER_URL}/brd_posts/${postNo}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPostTitle(data.postTitle);
                setPostSub(data.postSub);
                setPost(prevState => ({ ...prevState, postTitle: data.postTitle, postSub: data.postSub })); // postTitle 초기값 설정
            } catch (error) {
                console.error('Error fetching brdName:', error);
            }
        };

        fetchPost();
    }, [postNo]);


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

    // Quill 에디터의 이미지 업로드 핸들러
    function imageHandler() {
        fetch(SERVER_URL + '/brd_posts/lastPostNo')
            .then(response => response.json())
            .then(data =>  {postNo = data} )
            .catch(err => console.error(err));

        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.setAttribute('multiple', 'true');
        input.click();

        input.onchange = () => {
            const files = Array.from(input.files);

            if (files.length > 1) {
                alert('한번에 한 사진만 업로드 가능합니다!');
                return;
            }

            const formData = new FormData();

            files.forEach(file => {
                formData.append('file', file);
            });

            formData.append('tableName', 'brd_post');
            formData.append('number', postNo + 1);

            fetch(`${SERVER_URL}/files/FileNums`, {
                method: 'POST',
                body: formData,
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    setFilesNumbers(prevFilesNumbers => [...prevFilesNumbers, ...data]);

                    const storageBaseUrl = "https://storage.googleapis.com/cantata_opera/";
                    const urlsForFiles = files.map(file => {
                        const postUrlPath = `brd_post/${postNo + 1}/${file.name}`;
                        return storageBaseUrl + postUrlPath;
                    });

                    const newFileSrcToNumberMap = {};
                    urlsForFiles.forEach((url, index) => {
                        newFileSrcToNumberMap[url] = data[index];
                    });
                    setFileSrcToNumberMap(prevMap => ({ ...prevMap, ...newFileSrcToNumberMap }));

                    // 이미지 삽입
                    urlsForFiles.forEach(url => {
                        insertToEditor(url);
                    });
                })
                .catch(error => {
                    console.error("There was a problem with the fetch operation:", error.message);
                })
                .finally(() => {
                    setImageLoading(false);
                });
        };
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
                    ["image"],
                ],
                imageResize: {
                    // https://www.npmjs.com/package/quill-image-resize-module-react 참고
                    parchment: Quill.import("parchment"),
                    modules: ["Resize", "DisplaySize", "Toolbar"],
                },
                handlers: {
                    image: imageHandler
                }
            }
        };
    }, []);
    
    //<QuillEditor> quill 에디터 컴포넌트 ref
    const quillRef1 = useRef(null);
    const quillRef2 = useRef(null);

    //글 수정
    function updatePost() {
        //글 수정 요청을 서버에 보내기
       fetch(`${SERVER_URL}/brd_posts/updatePost/${postNo}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...post,
            brdNo: { brdNo: post.brdNo },
            id: {id: post.id}
        })
    })
        .then(response => {
            if (response.ok) {
                alert('수정 완료.');
                navigate(-1);
            } else {
                alert('수정되지 않았습니다.');
            }
        })
        .catch(err => console.error(err));
    }
    return (
        <div className='contentsArea'>
            <div className='contents'>
                {/* <form> */}
                <div>
                    <h1>{postTitle}</h1>
                </div>
                <div className="divrows">
                    <div className="formHeader">제&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;목</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder="" className="fullwidth" name="postTitle" value={postTitle} onChange={handleChange} readOnly/>
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
                                imageResize: {
                                    parchment: Quill.import("parchment"),
                                    modules: ["Resize", "DisplaySize", "Toolbar"],
                                },
                            }}
                            formats={formats}
                            preserveWhitespace
                            onChange={handleQuillChange}
                            className="customQuill"
                        ></ReactQuill>
                    </div>
                </div>
                <div className="divrows formTxtArea">
                    <Button onClick={updatePost} variant="secondary">등록</Button> &nbsp;
                    <Button onClick={handleRedirect} variant="secondary">뒤로가기</Button>
                </div>

                {/* </form> */}
            </div>

        </div>

    )
};

export default EditPost;
