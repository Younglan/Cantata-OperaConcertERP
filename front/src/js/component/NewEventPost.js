import React, { useRef, useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../css/NewPost.css';
// QuillEditor
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";

Quill.register("modules/imageResize", ImageResize);
const SERVER_URL = 'http://localhost:8090';

function NewEventPost() {
    const { BoardType } = useParams();
    const [boardName, setBoardName] = useState('');
    const [validationError, setValidationError] = useState(false);
    const navigate = useNavigate();
    const [filesNumbers, setFilesNumbers] = useState([]);
    const [imageLoading, setImageLoading] = useState(false);
    const [fileSrcToNumberMap, setFileSrcToNumberMap] = useState({});

    let postNo;

    const [post, setPost] = useState({
        postTitle: '',
        postFile1: '',
        postSub: '',
        postDeadline: '',
        brdNo: ''
    });
    const [postSub, setPostSub] = React.useState('');

    useEffect(() => {
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

    const handleRedirect = () => {
        navigate(-1);
    };

    const handleChange = (event) => {
        setPost({
            ...post,
            [event.target.name]: event.target.value
        });
    }

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

    const insertToEditor = (url) => {
        const quill = quillRef1.current.getQuill();
        const range = quill.getSelection();
        quill.insertEmbed(range ? range.index : 0, 'image', url);
    }

    const imageHandler = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/brd_posts/lastPostNo`);
            const data = await response.json();
            postNo = data;

            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.setAttribute('multiple', 'true');
            input.click();

            input.onchange = async () => {
                const files = Array.from(input.files);

                if (files.length > 1) {
                    alert('한번에 한 사진만 업로드 가능합니다!');
                    return;
                }

                const formData = new FormData();

                // 이미지가 선택된 경우에만 FormData에 추가합니다.
                if (files.length > 0) {
                    files.forEach(file => {
                        formData.append('file', file);
                    });
                }

                formData.append('tableName', 'brd_post');
                formData.append('number', postNo + 1);

                try {
                    const response = await fetch(`${SERVER_URL}/files/FileNums`, {
                        method: 'POST',
                        body: formData,
                    });

                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }

                    const data = await response.json();

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

                    urlsForFiles.forEach(url => {
                        insertToEditor(url);
                    });
                } catch (error) {
                    console.error("There was a problem with the fetch operation:", error.message);
                } finally {
                    setImageLoading(false);
                }
            };
        } catch (error) {
            console.error('Error fetching lastPostNo:', error);
        }
    };

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
                    parchment: Quill.import("parchment"),
                    modules: ["Resize", "DisplaySize", "Toolbar"],
                },
                handlers: {
                    image: imageHandler
                }
            }
        };
    }, []);

    const quillRef1 = useRef(null);

    //새로운 글 저장
    const newPostSave = async () => {
        const isValid = validateForm();//제목이 아무것도 쓰여있지 않을시 false
        if (isValid) {
            setValidationError(false);

            try {
                const response = await fetch(`${SERVER_URL}/brd_posts/lastPostNum/${BoardType}`);
                const data = await response.json();

                const selectedFile = document.getElementById("postFile1").files[0];
                console.log("Selected File:", selectedFile);
                const formData = new FormData();
                formData.append("postFile", selectedFile);
                formData.append('post', JSON.stringify(post));
                formData.append('postNum', data + 1);
                formData.append('brdNo', BoardType);

                const saveResponse = await fetch(`${SERVER_URL}/brd_posts/newEventPost`, {
                    method: 'POST',
                    body: formData
                });
                if (saveResponse.ok) {
                    alert('저장완료.');
                    navigate(-1);
                } else {
                    alert('저장되지 않았습니다.');
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            setValidationError(true);
        }
    }

    const validateForm = () => {
        return !(!post.postTitle.trim() || !post.postSub.trim());
    };

    return (
        <div className='contentsArea'>
            <div className='contents'>
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
                {BoardType === '4' && (
                    <div className="divrows">
                        <div className="formHeader">마&nbsp;&nbsp;&nbsp;&nbsp;침&nbsp;&nbsp;&nbsp;&nbsp;일</div>
                        <div className="divcolscont">
                            <Form.Control type="date" placeholder="" className="fullwidth" name="postDeadline" value={post.postDeadline} onChange={handleChange} />
                        </div>
                    </div>
                )}
                <div className="divrows">
                    <div className="formHeader">포스터&nbsp;&nbsp;등록</div>
                    <div className="divcolscont">
                        <Form.Control type="file" id="postFile1" name="postFile1" />
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
                    <Button onClick={newPostSave} variant="secondary" disabled={!validateForm()}>등록</Button> &nbsp;
                    <Button onClick={handleRedirect} variant="secondary">뒤로가기</Button>
                </div>
            </div>
        </div>
    );
}

export default NewEventPost;
