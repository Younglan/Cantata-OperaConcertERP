import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef } from "react";

Quill.register("modules/imageResize", ImageResize);

const SERVER_URL = 'http://localhost:8090';

function NewPost() {
    const navigate = useNavigate();
    const { BoardType } = useParams();

    const [brd_post, setPost] = useState({
        brdNo: '',
        postTitle: '',
        postFile1: '',
        pfEximg: '',
        pfExplan: '',
        pfNotice: '',
        postDeadline: '',
    });




    const [content, setContent] = useState('');

    const quillRef = useRef(null);

    const toolbarOptions = [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["image"],
    ];
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
    //<QuillEditor> 
    const modules = {
        toolbar: {
            container: toolbarOptions,
        },
        imageResize: {
            parchment: Quill.import("parchment"),
            modules: ["Resize", "DisplaySize", "Toolbar"],
        },
    };

    useEffect(() => {
        if (quillRef.current) {
            const { getEditor } = quillRef.current;
            const toolbar = quillRef.current.getEditor().getModule("toolbar");
            const handleImage = () => {
                // 이미지 업로드 핸들링 등
            };
            toolbar.addHandler("image", handleImage);
        }
    }, []);

    const handleChange = (event) => {
        setPost({
            ...brd_post,
            [event.target.name]: event.target.value
        });
    };

    //새로운 공연 등록
    const fetchPostSave = () => {
        // 글 저장 로직 구현
        // brd_post 및 content 상태값을 이용하여 서버에 글을 저장합니다.
        fetch(`${SERVER_URL}/brd_posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...brd_post,
                content
            })
        })
        .then(response => {
            if (response.ok) {
                alert('글이 저장되었습니다.');
                navigate(`/board/${BoardType}`);
            } else {
                alert('글을 저장하는 중에 오류가 발생했습니다.');
            }
        })
        .catch(error => {
            console.error('Error saving post:', error);
            alert('글을 저장하는 중에 오류가 발생했습니다.');
        });
    };


    return (
        <div className='contentsArea'>
            <div className='contents'>
                {/* <form> */}
                <div>
                    <h1>글쓰기</h1>
                </div>
                <div className="divrows">
                    <div className="formHeader">{BoardType}</div>
                    {/* <div className="divcolscont">
                    <Form.Select aria-label="Default select example" className="fullwidth" name="pfCate" value={perform.pfCate}onChange={handleChange} >
                        <option value="1" selected>공연</option>
                        <option value="2">전시</option>
                        <option value="3">음악</option>
                    </Form.Select>
                    </div> */}
                </div>
                <div className="divrows">
                    <div className="formHeader">제&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;목</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder="" className="fullwidth" name="postTitle" value={brd_post.postTitle} onChange={handleChange} />
                    </div>
                </div>
                {/* <div className="divrows">
                    <div className="formHeader">시&nbsp;&nbsp;&nbsp;&nbsp;작&nbsp;&nbsp;&nbsp;&nbsp;일</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder=""  className="fullwidth"/>
                    </div>
                    <div className="formHeader">마&nbsp;&nbsp;&nbsp;&nbsp;침&nbsp;&nbsp;&nbsp;&nbsp;일</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder=""  className="fullwidth"/>
                    </div>
                </div>  나중에 이벤트에서 사용 예정*/}

                <div className="divrows">
                    <div className="formHeader">포스터&nbsp;&nbsp;등록</div>
                    <div className="divcolscont">
                        <Form.Control type="file" />
                    </div>
                </div>

                <div className="divrows formTxtArea">
                    <div className="formHeader ">글쓰기</div>
                    <div className="divcolscont  ">
                        <ReactQuill
                            ref={quillRef}
                            value={content}
                            theme="snow"
                            modules={modules}
                            formats={formats}
                            preserveWhitespace
                            className="customQuill"
                            onChange={setContent}
                        ></ReactQuill>
                    </div>
                </div>
                <div className="divrows formTxtArea">
                    <Button onClick={fetchPostSave} variant="secondary">등록</Button>
                </div>
            </div>
        </div>

    );
};

export default NewPost;