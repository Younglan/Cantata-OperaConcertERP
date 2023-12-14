import React, { useRef, useState, useMemo, useEffect,useReducer } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import '../plant/css/NewPlant.css'


//QuillEditor
// import ReactQuill, {Quill} from "react-quill";
// import ImageResize from "quill-image-resize-module-react";
// import "react-quill/dist/quill.snow.css";


// Quill.register("modules/imageResize", ImageResize);

function Newplant(props) {
    //네비게이터
    const navigate = useNavigate();
   // const [open, setOpen] = useState(false);
    // const [pfNotice, setPfNotice] = React.useState('');
    // const [pfExplan, setPfExplan] = React.useState('');


    const [plant, setPlant] = useState({
        plant_name:'',
        plant_use:'무대',
        plant_detail:'',
        capacity:'',
        plant_charge:'',
        plant_mainimg:'',
        plant_sub:'',
        plant_status:'',
        floor:'',
    });
    // plant_subimg1:'',
    // plant_subimg2:'',

    // 연결된 파일 번호 리스트
    // const [filesNumbers, setFilesNumbers] = useState([]);
    // const [imageLoading, setImageLoading] = useState(false);
     // 파일의 SRC와 번호를 매핑한 객체
    //  const [fileSrcToNumberMap, setFileSrcToNumberMap] = useState({});

    //리다이렉션 핸들러
    const handleRedirect = () => {
            navigate(-1);
    };

    // 폼의 input 값 변경 핸들러
    function handleChange (event) {
         setPlant({...plant,
            [event.target.name]:event.target.value,}); console.log(plant);
    }

  //새로운 공연 등록
  function newPlantSave(){
    console.log(plant)
    fetch('http://localhost:8090/plants/plantapp',
    {
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(plant)
    })
    .then(response =>{
        if(response.ok){
            alert('저장완료.');
            // navigate("/performList");
            
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
                    <h1>시설등록 폼</h1>
                </div>
                <div className="divrows">
                    <div className="formHeader">시설 용도</div>
                    <div className="divcolscont">
                    <Form.Select aria-label="Default select example" className="fullwidth" name="plant_use" value={plant.plant_use} onChange={handleChange}>
                        <option value="무대">무대</option>
                        <option value="연습실">연습실</option>
                    </Form.Select>
                    </div>
                </div>
                <div className="divrows">
                    <div className="formHeader">시설명</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder=""  className="fullwidth" name="plant_name" value={plant.plant_name} onChange={handleChange} />
                    </div>
                </div>
                <div className="divrows">
                    <div className="formHeader">시설&nbsp;설명</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder=""  className="fullwidth" name="plant_detail" value={plant.plant_datail} onChange={handleChange}/>
                    </div>
                    <div className="formHeader">수용인원</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder=""  className="fullwidth" name="capacity" value={plant.capacity} onChange={handleChange}/>
                    </div>
                    <div className="formHeader">대관요금</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder=""  className="fullwidth" name="plant_charge" value={plant.plant_charge} onChange={handleChange} />
                    </div>
                </div>
                <div className="divrows">
                    {/* <div className="formHeader">장&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소</div>
                    <div className="divcolscont">
                    <Form.Select aria-label="Default select example" className="fullwidth"  >
                        <option value="오디토리움">오디토리움</option>
                        <option value="퍼포먼스홀">퍼포먼스홀</option>
                    </Form.Select>
                    </div> */}
                    <div className="formHeader">장소&nbsp;상태</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder=""  className="fullwidth" name="plant_status" value={plant.plant_status} onChange={handleChange} />
                    </div>
                    <div className="formHeader">부대시설</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder=""  className="fullwidth"  name="plant_sub" value={plant.plant_sub} onChange={handleChange} />
                    </div>
                    <div className="formHeader">층&nbsp;수</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder="층수를입력하세요"  className="fullwidth"  name="floor" value={plant.floor} onChange={handleChange} />
                    </div>
                    <div>
            <Form.Control
                type='file'
                className='shadow-none'
                name="plant_mainimg" 
                value={plant.plant_mainimg}
                accept='image/*'
                onChange={(e) => { handleChange(e) }}></Form.Control>
                    </div>
                </div>
                <div className="divrows formTxtArea">
                    <Button  onClick={newPlantSave} variant="secondary">등록</Button> &nbsp;
                    <Button  onClick={handleRedirect} variant="secondary">뒤로가기</Button>   
                </div>

            </div>    
            
        </div>

    )};

export default Newplant;