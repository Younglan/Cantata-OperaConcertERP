import React, {useState } from "react";
import { useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import '../plant/css/NewPlant.css';

import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";


function Newplant(props) {
    //네비게이터
    const navigate = useNavigate();
    const [plant, setPlant] = useState({
        plant_name:'',
        plant_use:'무대',
        plant_detail:'',
        capacity:'',
        plant_charge:'',
        // plant_mainimg:'',
        // plant_subimg1:'',
        // plant_subimg2:'',
        plant_sub:'',
        plant_status:true,
        floor:'',
    });
    const [plExplan, setPlExplan] = React.useState('');
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
const handleQuillChange = (plExplanValue) => {
  // plExplan 출력
  console.log(plExplan);

  // plExplan 상태 업데이트
  setPlExplan(plExplanValue);

  // plant 상태 업데이트
  setPlant((prevState) => ({ ...prevState, plant_detail: plExplanValue }));
}
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
    "width",
];
const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ["clean"],
    ],
  };

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
                    <ReactQuill
                        style={{ height: "500px",marginBottom:"60px" }}
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        value={plExplan}
                        onChange={handleQuillChange}
                        />
                    <div className="formHeader">수용인원</div>
                    <div className="divcolscont">
                        <Form.Control type="number" placeholder="숫자만 입력하세요"  className="fullwidth" name="capacity" value={plant.capacity} onChange={handleChange}/>
                    </div>
                    <div className="formHeader">대관요금</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder=""  className="fullwidth" name="plant_charge" value={plant.plant_charge} onChange={handleChange} />
                    </div>
                </div>
                <div className="divrows">
                    <div className="formHeader">장소&nbsp;상태</div>
                    <Form.Select aria-label="Default select example" className="fullwidth" name="plant_status" value={plant. plant_status} onChange={handleChange}>
                        <option value="True">사용가능</option>
                        <option value="False">불가능</option>
                    </Form.Select>
                    <div className="formHeader">부대시설</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder=""  className="fullwidth"  name="plant_sub" value={plant.plant_sub} onChange={handleChange} />
                    </div>
                    <div className="formHeader">층&nbsp;수</div>
                    <div className="divcolscont">
                        <Form.Control type="number" placeholder="숫자만입력하세요"  className="fullwidth"  name="floor" value={plant.floor} onChange={handleChange} />
                    </div>
                </div>
                {/* <div className="divrows">
                    <div className="formHeader">대표&nbsp;이미지&nbsp;등록</div>
                    <div className="divcolscont">
                        <Form.Control type="file" name="plant_mainimg"  onChange={handleFileChange} accept="image/*"/>
                    </div>
                    <div className="formHeader">부가&nbsp;이미지&nbsp;등록</div>
                    <div className="divcolscont">
                        <Form.Control type="file" name="plant_subimg1"  onChange={handleFileChange} accept="image/*"/>
                    </div>
                    <div className="formHeader">부가&nbsp;이미지&nbsp;등록</div>
                    <div className="divcolscont">
                        <Form.Control type="file" name="plant_subimg2"  onChange={handleFileChange} accept="image/*"/>
                    </div>
                </div> */}
                <div className="divrows formTxtArea">
                    <Button  onClick={newPlantSave} variant="secondary">등록</Button> &nbsp;
                    <Button  onClick={handleRedirect} variant="secondary">뒤로가기</Button>   
                </div>

            </div>    
            
        </div>

    )};

export default Newplant;