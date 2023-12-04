import React, { useRef, useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './NewPerform.css';

//QuillEditor
import ReactQuill, {Quill} from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";


Quill.register("modules/imageResize", ImageResize);
const SERVER_URL='http://localhost:8090';

function NewPerform(props) {
    //네비게이터
    const navigate = useNavigate();
   // const [open, setOpen] = useState(false);
    const [pfNotice, setPfNotice] = React.useState('');
    const [pfExplan, setPfExplan] = React.useState('');
   
    let pfCode ;

    useEffect(() => {

    }, []);


    const [perform, setPerform] = useState({
        pfCate : '공연',
        pfTitle : '',
        agency : '',
        agencyTel : '',
        pfPoster : '',
        pfEximg : '',
        pfExplan : '',
        pfNotice : '',
        pfStart : '',
        pfEnd : '',
        pfRuntime : '',
        costR : '',
        costS : '',
        costA: '',
        costB: '',
        costC : '',
        costD : ''
    });

    // 연결된 파일 번호 리스트
    const [filesNumbers, setFilesNumbers] = useState([]);
    const [imageLoading, setImageLoading] = useState(false);
     // 파일의 SRC와 번호를 매핑한 객체
     const [fileSrcToNumberMap, setFileSrcToNumberMap] = useState({});

    //리다이렉션 핸들러
    const handleRedirect = () => {
            navigate(-1);
    };

    // 폼의 input 값 변경 핸들러
    const handleChange = (event) => {
        setPerform({...perform,
            [event.target.name]:event.target.value});
    }

    // Quill 에디터의 컨텐츠 변경 핸들러 (이미지 태그가 제거될 경우 관련 파일 번호도 제거)
    const handleQuillChange = (pfNoticeValue) => {
        setPfNotice(pfNoticeValue);
        setPerform(prevState => ({ ...prevState, pfNotice: pfNoticeValue }));

        const imgTagPattern = /<img [^>]*src="([^"]+)"[^>]*>/g;
        const currentSrcs = [];
        let match;
        while (match = imgTagPattern.exec(pfNoticeValue)) {
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
        else if(quillRef2.current) {
            const editor = quillRef2.current.getEditor();
            const range = editor.getSelection();
            editor.insertEmbed(range ? range.index : 0, 'image', url);
        }
    }

    // Quill 에디터의 이미지 업로드 핸들러
    function imageHandler(){
        fetch(SERVER_URL+'/performances/lastPfCode')
            .then(response => response.json())
            .then(data => {pfCode = data})
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
            console.log(pfCode);
            formData.append('tableName', 'performance');
            formData.append('number', pfCode + 1);

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
                    const postUrlPath = `performance/${pfCode + 1}/${file.name}`;
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
                    image: imageHandler,
                },
            }, 
        };
    }, []);
  //<QuillEditor> quill 에디터 컴포넌트 ref
  const quillRef1 = useRef(null);
  const quillRef2 = useRef(null);

  //새로운 공연 등록
  function newPerformSave(){
    fetch(SERVER_URL+'/performances',
    {
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(perform)
    })
    .then(response =>{
        if(response.ok){
            alert('저장완료.');
            navigate("/performList");
            
        }else{
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
                    <h1>공연등록 폼</h1>
                </div>
                <div className="divrows">
                    <div className="formHeader">공연 카테고리</div>
                    <div className="divcolscont">
                    <Form.Select aria-label="Default select example" className="fullwidth" name="pfCate" value={perform.pfCate}onChange={handleChange} >
                        <option value="공연">공연</option>
                        <option value="전시">전시</option>
                        <option value="음악">음악</option>
                    </Form.Select>
                    </div>
                </div>
                <div className="divrows">
                    <div className="formHeader">제&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;목</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder=""  className="fullwidth" name="pfTitle" value={perform.pfTitle} onChange={handleChange} />
                    </div>
                </div>
                <div className="divrows">
                    <div className="formHeader">시&nbsp;&nbsp;&nbsp;&nbsp;작&nbsp;&nbsp;&nbsp;&nbsp;일</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder=""  className="fullwidth"/>
                    </div>
                    <div className="formHeader">마&nbsp;&nbsp;&nbsp;&nbsp;침&nbsp;&nbsp;&nbsp;&nbsp;일</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder=""  className="fullwidth"/>
                    </div>
                    <div className="formHeader">런 타 임 (분)</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder=""  className="fullwidth" name="pfRuntime" value={perform.pfRuntime} onChange={handleChange} />
                    </div>
                </div>
                <div className="divrows">
                    <div className="formHeader">장&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소</div>
                    <div className="divcolscont">
                    <Form.Select aria-label="Default select example" className="fullwidth"  >
                        <option value="오디토리움">오디토리움</option>
                        <option value="퍼포먼스홀">퍼포먼스홀</option>
                    </Form.Select>
                    </div>
                    <div className="formHeader">기&nbsp;&nbsp;&nbsp;&nbsp;획&nbsp;&nbsp;&nbsp;&nbsp;사</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder=""  className="fullwidth" name="agency" value={perform.agency} onChange={handleChange} />
                    </div>
                    <div className="formHeader">문&nbsp;&nbsp;&nbsp;&nbsp;의&nbsp;&nbsp;&nbsp;&nbsp;처</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder="전화번호를 입력하세요"  className="fullwidth"  name="agencyTel" value={perform.agencyTel} onChange={handleChange} />
                    </div>
                </div>
                <div className="divrows">
                    <div className="formHeader">좌석별 가격</div>
                    <div className="divcolscont">
                        <div className="seatprices">
                            <span className="seatprice">R석</span>
                            <Form.Control type="text" placeholder="" className="seatprice"name="costR"  value={perform.costR} onChange={handleChange} />
                            <span className="seatprice">S석</span>
                            <Form.Control type="text" placeholder="" className="seatprice"name="costS"  value={perform.costS} onChange={handleChange}/>
                            <span className="seatprice">A석</span>
                            <Form.Control type="text" placeholder="" className="seatprice"name="costA"  value={perform.costA} onChange={handleChange}/>
                            </div>
                            <div className="seatprices">
                            <span  className="seatprice">B석</span>
                            <Form.Control type="text" placeholder=""  className="seatprice"name="costB"  value={perform.costB} onChange={handleChange}/>
                            <span className="seatprice">C석</span>
                            <Form.Control type="text" placeholder=""  className="seatprice"name="costC"  value={perform.costC} onChange={handleChange}/>
                            <span className="seatprice">D석</span>
                            <Form.Control type="text" placeholder=""  className="seatprice"name="costD"  value={perform.costD} onChange={handleChange}/>
                        </div>
                    </div>
                </div>
                <div className="divrows">
                    <div className="formHeader">포스터&nbsp;&nbsp;등록</div>
                    <div className="divcolscont">
                        <Form.Control type="file" name="pfPoster" value={perform.pfPoster} onChange={handleChange}/>
                    </div>
                </div>
                <div className="divrows formTxtArea">
                    <div className="formHeader">공 지 사 항</div>
                    <div className="divcolscont">
                    <ReactQuill
                                ref={quillRef1}
                                value={pfNotice}
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
                {/* <div className="divrows formTxtArea">
                    <div className="formHeader ">상 세 설 명</div>
                    <div className="divcolscont  ">
                    <ReactQuill
                                ref={quillRef2}
                                value={pfExplan}
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
                                onChange={handleQuillChange2}
                                className="customQuill"
                    ></ReactQuill>
                    </div>
                </div> */}
                <div className="divrows formTxtArea">
                    <Button  onClick={newPerformSave} variant="secondary">등록</Button> &nbsp;
                    <Button  onClick={handleRedirect} variant="secondary">뒤로가기</Button>   
                </div>

                {/* </form> */}
            </div>    
            
        </div>

    )};

export default NewPerform;








