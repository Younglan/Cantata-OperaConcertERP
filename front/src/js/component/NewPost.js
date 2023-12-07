import React, { useRef, useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../css/NewPost.css';
//QuillEditor
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";


Quill.register("modules/imageResize", ImageResize);
const SERVER_URL = 'http://localhost:8090';

function NewPost(props) {
    const { BoardType } = useParams();
    const [boardName, setBoardName] = useState('');
    //네비게이터
    const navigate = useNavigate();
     // 연결된 파일 번호 리스트
     const [filesNumbers, setFilesNumbers] = useState([]);
     const [imageLoading, setImageLoading] = useState(false);
     // 파일의 SRC와 번호를 매핑한 객체
     const [fileSrcToNumberMap, setFileSrcToNumberMap] = useState({});
    // const [open, setOpen] = useState(false);

    let postNo;

    const [post, setPost] = useState({
        postTitle: '',
        postFile1: '',
        postSub: '',
        postDeadline: '',
        brdNo: `${BoardType}`
    });
    const [postSub, setPostSub] = React.useState('');
    // const [selectedBrdNo, setSelectedBrdNo] = useState(null);
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
            .then(data => { postNo = data })
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

            formData.append('tableName', 'brd_posts');
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
                        const postUrlPath = `brd_posts/${postNo + 1}/${file.name}`;
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

    //새로운 글 등록
    function newPostSave() {

        fetch(SERVER_URL + '/brd_posts/newPost',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...post,
                    brdNo: {brdNo: parseInt(BoardType)}
                })
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
    }


    return (
        <div className='contentsArea'>
            <div className='contents'>
                {/* <form> */}
                <div>
                    <h1>글쓰기 폼</h1>
                </div>
                <div className="divrows">
                    <div className="formHeader"><p>{boardName}</p></div>
                </div>
                <div className="divrows">
                    <div className="formHeader">제&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;목</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder="" className="fullwidth" name="postTitle" value={post.postTitle} onChange={handleChange} />
                    </div>
                </div>
                <div className="divrows">
                    <div className="formHeader">마&nbsp;&nbsp;&nbsp;&nbsp;침&nbsp;&nbsp;&nbsp;&nbsp;일</div>
                    <div className="divcolscont">
                        <Form.Control type="date" placeholder="" className="fullwidth" name = "postDeadline" value={post.postDeadline} onChange={handleChange}/>
                        {/* 이거는 이벤트에만 쓸 예정 나중에 배너하고도 연결해야함.. */}
                    </div>
                </div>
                <div className="divrows">
                    <div className="formHeader">포스터&nbsp;&nbsp;등록</div>
                    <div className="divcolscont">
                        <Form.Control type="file" name="postFile1" value={post.postFile1} onChange={handleChange} />
                    </div>
                </div>
                <div className="divrows formTxtArea">
                    <div className="formHeader">글 쓰 기</div>
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
                    <Button onClick={newPostSave} variant="secondary">등록</Button> &nbsp;
                    <Button onClick={handleRedirect} variant="secondary">뒤로가기</Button>
                </div>

                {/* </form> */}
            </div>

        </div>

    )
};

export default NewPost;
