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
        plantName:'',
        plantUse:'무대',
        plantDetail:'',
        capacity:'',
        plantCharge:'',
        // plant_mainimg:'',
        // plant_subimg1:'',
        // plant_subimg2:'',
        plantSub:'',
        plantStatus:true,
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

    
function newPlantSave(){
    // 이미지 요소 가져오기
    var plantMainimgElement = document.getElementById("plantMainimg");
    var plantSubimg1Element = document.getElementById("plantSubimg1");
    var plantSubimg2Element = document.getElementById("plantSubimg2");
    if(!plant.plantName){
        alert("제목을 입력하세요.");
    }else if(!plant.floor){
        alert("층수을 입력하세요.");
    }else if(!plant.capacity){
        alert("수용 인원를 입력하세요.");
    }else if(!plantMainimgElement.value){
        alert("포스터이미지를 등록하세요");
    }else if(!plantSubimg1Element.value){
            alert("부가이미지를 등록하세요");
    }else if(!plantSubimg2Element.value){
            alert("부가이미지를 등록하세요");
    }else if(!plant.plantDetail){
        alert("시설설명을 입력하세요.");
    }else if(!plant.plantCharge){
        alert("대관 요금을 입력하세요.");
    }else{
        var formData = new FormData();
        formData.append("plantMainimgFile", plantMainimgElement.files[0]);
        formData.append("plantSubimg1File", plantSubimg1Element.files[0]);
        formData.append("plantSubimg2File", plantSubimg2Element.files[0]);
        formData.append('plant', JSON.stringify(plant));
    
        fetch('http://localhost:8090/plants/plantapp',
        {
            method:'POST',
            body: formData,
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
    
}
const handleQuillChange = (plExplanValue) => {
  // plExplan 출력
  console.log(plExplan);

  // plExplan 상태 업데이트
  setPlExplan(plExplanValue);

  // plant 상태 업데이트
  setPlant((prevState) => ({ ...prevState, plantDetail: plExplanValue }));
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
                    <Form.Select aria-label="Default select example" className="fullwidth" name="plantUse" value={plant.plantUse} onChange={handleChange}>
                        <option value="무대">무대</option>
                        <option value="연습실">연습실</option>
                    </Form.Select>
                    </div>
                </div>
                <div className="divrows">
                    <div className="formHeader">시설명</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder=""  className="fullwidth" name="plantName" value={plant.plantName} onChange={handleChange} />
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
                        <Form.Control type="text" placeholder=""  className="fullwidth" name="plantCharge" value={plant.plantCharge} onChange={handleChange} />
                    </div>
                </div>
                <div className="divrows">
                    <div className="formHeader">장소&nbsp;상태</div>
                    <Form.Select aria-label="Default select example" className="fullwidth" name="plantStatus" value={plant.plantStatus} onChange={handleChange}>
                        <option value="True">사용가능</option>
                        <option value="False">불가능</option>
                    </Form.Select>
                    <div className="formHeader">부대시설</div>
                    <div className="divcolscont">
                        <Form.Control type="text" placeholder=""  className="fullwidth"  name="plantSub" value={plant.plantSub} onChange={handleChange} />
                    </div>
                    <div className="formHeader">층&nbsp;수</div>
                    <div className="divcolscont">
                        <Form.Control type="number" placeholder="숫자만입력하세요"  className="fullwidth"  name="floor" value={plant.floor} onChange={handleChange} />
                    </div>
                </div>
                <div className="divrows">
                    <div className="formHeader">대표&nbsp;이미지&nbsp;등록</div>
                    <div className="divcolscont">
                        <Form.Control type="file" name="plantMainimg"   id="plantMainimg"/>
                    </div>
                    <div className="formHeader">부가&nbsp;이미지&nbsp;등록</div>
                    <div className="divcolscont">
                        <Form.Control type="file" name="plantSubimg1"  id="plantSubimg1"/>
                    </div>
                    <div className="formHeader">부가&nbsp;이미지&nbsp;등록</div>
                    <div className="divcolscont">
                        <Form.Control type="file" name="plantSubimg2"  id="plantSubimg2"/>
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