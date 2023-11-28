import React, {useState} from "react";
// import Button from "@mui/material/Button";

import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import './NewPerform.css';

//QuillEditor
import ReactQuill, {Quill} from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import { useRef, useEffect } from "react";
Quill.register("modules/imageResize", ImageResize);



function NewPerform(props) {
   // const [open, setOpen] = useState(false);
   const [content, setContent] = React.useState('');

    const [perform, setPerform] = useState({
        pfCate : '',
        pfTitle : '',
        agency : '',
        pfPoster : '',
        pfEximg : '',
        pfExplan : '',
        pfNotice : '',
        pfStart : '',
        pfEnd : '',
        pfRuntime : '',
        costR : '',
        costA: '',
        costB: '',
        costC : '',
        costD : ''
    });

        
  

   //<QuillEditor> quill 에디터 컴포넌트 ref
   const quillRef = useRef(null);
   // <QuillEditor> 사용하고 싶은 옵션, 나열 되었으면 하는 순서대로 나열
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
      // https://www.npmjs.com/package/quill-image-resize-module-react 참고
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
  };

  useEffect(() => {
    
    
    if (quillRef.current) {
      const {getEditor} = quillRef.current;
      const toolbar = quillRef.current.getEditor().getModule("toolbar");
      // toolbar.addHandler("image", handleImage);

      //toolbar를 선택해서 핸들러를 추가해주는 방법
      const handleImage = () => {

        };
    }
   
  }, []);

  const handleChange = (event) => {
    setPerform({...perform,
        [event.target.name]:event.target.value});
}
  //새로운 공연 등록
  const newPerformSave = () => {
    props.updateCar(perform, props.data.id);
    // handleClose();
}


    return (
        <div className='contentsArea'>
            <div className='contents'>
        
                <div>
                    <h1>공연등록 폼</h1>
                </div>
                <div className="divrows">
                    <div className="formHeader">공연 카테고리</div>
                    <div className="divcolscont">
                    <Form.Select aria-label="Default select example" className="fullwidth" name="pfCate" onChange={handleChange} >
                        <option value="공연">공연</option>
                        <option value="전시">전시</option>
                        <option value="음악">음악</option>
                    </Form.Select>
                    </div>
                </div>
                <div className="divrows">
                    <div className="formHeader">제&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;목</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder=""  className="fullwidth" name="pfTitle" onChange={handleChange} />
                    </div>
                </div>
                <div className="divrows">
                    <div className="formHeader">시작일</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder=""  className="fullwidth"/>
                    </div>
                    <div className="formHeader">마침일</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder=""  className="fullwidth"/>
                    </div>
                    <div className="formHeader">런타임(분)</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder=""  className="fullwidth"/>
                    </div>
                </div>
                <div className="divrows">
                    <div className="formHeader">장소</div>
                    <div className="divcolscont">
                    <Form.Select aria-label="Default select example" className="fullwidth">
                        <option value="오디토리움">오디토리움</option>
                        <option value="퍼포먼스홀">퍼포먼스홀</option>
                    </Form.Select>
                    </div>
                    <div className="formHeader">기획사</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder=""  className="fullwidth"/>
                    </div>
                    <div className="formHeader">문의처</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder="전화번호를 입력하세요"  className="fullwidth"/>
                    </div>
                </div>
                <div className="divrows">
                    <div className="formHeader">좌석별 가격</div>
                    <div className="divcolscont">
                        <div className="seatprices">
                            <span className="seatprice">R석</span>
                            <Form.Control type="text" placeholder="" className="seatprice"/>
                            <span className="seatprice">S석</span>
                            <Form.Control type="text" placeholder="" className="seatprice"/>
                            <span className="seatprice">A석</span>
                            <Form.Control type="text" placeholder="" className="seatprice"/>
                            </div>
                            <div className="seatprices">
                            <span  className="seatprice">B석</span>
                            <Form.Control type="text" placeholder=""  className="seatprice"/>
                            <span className="seatprice">C석</span>
                            <Form.Control type="text" placeholder=""  className="seatprice"/>
                            <span className="seatprice">D석</span>
                            <Form.Control type="text" placeholder=""  className="seatprice"/>
                        </div>
                    </div>
                </div>
                <div className="divrows">
                    <div className="formHeader">포스터&nbsp;&nbsp;등록</div>
                    <div className="divcolscont">
                        <Form.Control type="file" />
                    </div>
                </div>
                <div className="divrows formTxtArea">
                    <div className="formHeader">공 지 사 항</div>
                    <div className="divcolscont">
                    <ReactQuill
                                ref={quillRef}
                                value={content}
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
                                className="customQuill"
                    ></ReactQuill>
                    </div>
                </div>
                <div className="divrows formTxtArea">
                    <div className="formHeader ">상 세 설 명</div>
                    <div className="divcolscont  ">
                    <ReactQuill
                                ref={quillRef}
                                value={content}
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
                                className="customQuill"
                    ></ReactQuill>
                    </div>
                </div>
                <div className="divrows formTxtArea">
                    <Button  onClick={newPerformSave} variant="secondary">등록</Button>    
                </div>
            </div>    
            
        </div>

    )};

export default NewPerform;