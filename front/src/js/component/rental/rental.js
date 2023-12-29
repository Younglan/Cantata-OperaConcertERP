import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import './css/rental.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiCalendarDate } from "react-icons/ci";
import Paper from '@mui/material/Paper';
import Form from 'react-bootstrap/Form';
import { Grid,styled} from '@mui/material';
import {useNavigate} from "react-router-dom";
import { format } from 'date-fns';
import ko from "date-fns/locale/ko";
import moment from 'moment/moment';


const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'black' ? 'gray' : 'white',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const SERVER_URL='http://localhost:8090';
export default function RentalApps() {
  const [stDate, setStDate] = useState();
  const [edDate, setEdDate] = useState();
  const [dateCheck, setDateCheck] = useState();
  const [text, setText] = useState({
    rent_name:"",
    rent_status:"결제대기",
    rent_start:'',
    rent_end:'',
    rent_regidate:`${moment(new Date()).format("yyyy-MM-DD")}`,
    plantNo:'',
    // payment:0,
  });
  const [plants, setPlants] = useState([]);
    

    const navigate = useNavigate();

  useEffect(() => {
      fetchFindPlant();
      
  }, []);

    

    const onChange = (e) => {
        e.target?setText ({...text,
        [e.target.name]:e.target.value,
        }):setText ({...text,
          startDate:e,
          });
          console.log(text);
    }

    const handleRedirect = () => {
      navigate(-1);
    };

    function newRentalSave(){
      console.log(text)
      fetch('http://localhost:8090/rentals/rentalapp',
      {
          method:'POST',
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify(text)
      })
      .then(response => response.json())
      .then(response =>{console.log(response)
          if(response){
              alert('저장완료.');
              navigate("/Rentcom");
              
          }else{
              alert('저장되지않았습니다.');
          }
      })
      .catch(err => console.error(err))
  }
  const fetchFindPlant = () => {
    fetch('http://localhost:8090/plants/filteredPlant')
    .then(response => response.json())
    .then(data => {setPlants(data);console.log(data);})
    .catch(err => console.error(err));
    
}
const handlePlantChange = (selectdPlant) =>{console.log(selectdPlant);
  setStDate('');
  setEdDate('');
  
  setText(prevState => ({ ...prevState, plantNo:{plantNo:selectdPlant} }));
  
}
const handleStartChange = (selectedDate) => {
  if(!text.plantNo){
      alert('장소를 먼저 선택하세요');
  }else{
      setStDate(selectedDate);
  }
  
}
const handleEndChange = (selectedDate) => {
  if(!stDate){
      alert('시작일을 먼저 선택하세요');
  }else{
      setEdDate(selectedDate);
  }
  
}
useEffect(() => {
  const fetchData = async () => {
    if (stDate && edDate) {
      await parformDateCheck();
      await rentalDateCheck();
    }
  };

  fetchData();
}, [stDate, edDate]);



//공연 일정 체크
const parformDateCheck = async () => {
  try {
  console.log(stDate+edDate);
  const sendStartDate = new Date(moment(stDate).format("YYYY-MM-DD"));//Db
  const sendStartDate2 = format(stDate, 'yyyy-MM-dd', { locale: ko });//중복체크
  const sendEndDate = new Date(moment(edDate).format("YYYY-MM-DD"));
  const sendEndDate2 = format(edDate, 'yyyy-MM-dd', { locale: ko });
  //백엔드요청
  const response = await fetch(SERVER_URL + "/performances/checkPerformDate?plantNo=" + text.plantNo.plantNo + "&startDate=" + sendStartDate2 + "&endDate=" + sendEndDate2);
  const data = await response.json();

  console.log(data);

  if (data === true) {
    setDateCheck(null);
    setText(prevState => ({ ...prevState, plantNo: text.plantNo, rent_start: sendStartDate, rent_end: sendEndDate }));
  } else {
    setDateCheck(() => {
      alert('해당 날짜와 공연장에 개설할 수 없습니다.');
      setStDate("");
      setEdDate("");
    });
  }
} catch (error) {
  console.error(error);
}
}

//대관 일정 체크
const rentalDateCheck = async () => {
  try {
    const toStartDate = new Date(moment(stDate).format("YYYY-MM-DD")); // Db
    const toStartDate2 = format(stDate, 'yyyy-MM-dd', { locale: ko }); // 중복체크
    const toEndDate = new Date(moment(edDate).format("YYYY-MM-DD"));
    const toEndDate2 = format(edDate, 'yyyy-MM-dd', { locale: ko });

    const response = await fetch(SERVER_URL + "/rentals/checkRentalDate?plantNo=" + text.plantNo.plantNo + "&startDate=" + toStartDate2 + "&endDate=" + toEndDate2);
    const data = await response.json();

    console.log(data);

    if (data === true) {
      setDateCheck(null);
      setText(prevState => ({ ...prevState, plantNo: text.plantNo, rent_start: toStartDate, rent_end: toEndDate }));
    } else {
      setDateCheck(() => {
        alert('해당 날짜와 공연장에 대관 할 수 없습니다.');
        setStDate("");
        setEdDate("");
      });
    }
  } catch (error) {
    console.error(error);
  }
}
  return (
    <React.Fragment>
    <div className='apparea'>
      <div className='contentarea'>
      <div className='title'>
        <h1>대관신청</h1>
    </div>
    <div className='applicant'>
        <h2>신청자명</h2> 
      </div>
    <Box
      component="form"
      className='model'
      sx={{
        '& > :not(style)': {width: '20ch' },
      }}
      
    >
      
      
       <TextField InputProps={{ readOnly: true, style: { color: "black"}}} 
                  variant="filled" 
                  className= "paragraph" defaultValue={"신청자명"}
        /> 
      <TextField variant="outlined" name = "Name"
                    sx={{
                    '& > :not(style)': { width: '50ch'}, 
                  }}></TextField>
    </Box>
    <div className='applicant'>
        <h2>장소</h2> 
      </div>
    <Box
      component="form"
      sx={{
        display:'grid',
        gridAutoFlow: 'row',
        gridTemplateColumns: 'repeat(2, 0fr)',
        gridTemplateRows: 'repeat(2,50px)',
        gap:1,
        '& > :not(style)': {width: '20ch' },
      }}
      
    >
      
       <TextField InputProps={{ readOnly: true, style: { color: "black"}}} 
                  variant="filled"
                  id= "test1" defaultValue={"장소"} sx={{gridColumn:'1',height:'150px'}}
        /> 
        
        <Form.Select aria-label="Default select example" className="fullwidth" name="plantNo" value={text.plantNo.plantNo} onChange={(event) => handlePlantChange(event.target.value)}>
                        <option value="">장소선택</option>
                        {plants.map(plant => (
                                <option key={plant.plantNo} value={plant.plantNo}>
                                    {plant.plantName}
                                </option>
                            ))}
        </Form.Select>
        
    </Box>
    <div className='applicant'>
        <h2>활동정보</h2> 
      </div>
    <Box
      component="form"
      className='model'
      sx={{
        '& > :not(style)': {width: '20ch' },
      }}
      
    >
      
      
       <TextField InputProps={{ readOnly: true, style: { color: "black"}}} 
                  variant="filled"
                  className= "paragraph" defaultValue={"활동명"}
        > 활동명</TextField> 
      <TextField  variant="outlined"onChange={onChange} value={text.rent_name} name = "rent_name"
                     sx={{
                    '& > :not(style)': { width: '50ch' },
                  }}/>
    </Box>
    {/* <Box
      component="form"
      className='model'
      sx={{
        '& > :not(style)': {width: '20ch' },
      }}
      
    > 
       <TextField InputProps={{ readOnly: true, style: { color: "black"}}} 
                  variant="filled"
                  className= "paragraph" defaultValue={"장르"}
        /> 
      <TextField id="input1" variant="outlined" name = "Genre"
                     sx={{
                    '& > :not(style)': { width: '50ch' },
                  }}/>
    </Box>
    <Box
      component="form"
      className='model'
      sx={{
        '& > :not(style)': {width: '20ch' },
      }}
      
    > 
       <TextField InputProps={{ readOnly: true, style: { color: "black"}}} 
                  variant="filled"
                  className= "paragraph" defaultValue={"활동주요내용"}
        /> 
      <TextField id="input1" variant="outlined"  name = "Content"
                    sx={{
                    '& > :not(style)': { width: '50ch' },
                  }}/>
    </Box> */}
    <Box sx={{ flexGrow: 2, marginTop:'50px'}}>
    <div className='applicant2'>
        <h2>대관기간</h2> 
      </div>
      <Grid container spacing={2}>
      <TextField InputProps={{ readOnly: true, style: { color: "black", marginLeft: "15px",
      height:'195px', xs:'2',display:'grid'}}} 
                  variant="filled" sx={{gridColumn:'1'}}
                  id= "test1" defaultValue={"사용기한"}
        /> 
        <Grid item xs={4} gridColumn='2'>
          <Item2>    <section>
      <div>대관기간</div>
      <div>
        <h2>대관시작일</h2>
        <DatePicker 
              label="대관시작일"
              dateFormat='yyyy-MM-dd'
              locale={ ko }
              selected={stDate}
              onChange={handleStartChange}
              name='rent_start'
              selectsStart
              maxDate={edDate}
              minDate={new Date()}
              />
        <CiCalendarDate />
      </div>
      <div>
      <h2>대관종료일</h2>
        <DatePicker 
              label="대관종료일"
              locale={ ko }
              name='rent_end'
              dateFormat='yyyy-MM-dd'
              selected={edDate}
              onChange={handleEndChange}
              selectsEnd
              minDate={stDate}/>
        <CiCalendarDate />
      </div>
      </section></Item2>
        </Grid>
        </Grid>
        <Box
      component="form"
      className='model'
      sx={{
        '& > :not(style)': {width: '20ch',marginTop: '30px' },
      }}
      
    >
       
       <TextField InputProps={{ readOnly: true, style: { color: "black"}}} 
                  variant="filled"
                  className= "paragraph" defaultValue={"계약금"}
        /> 
      <TextField id="input1" variant="outlined" name = "payment" sx={{
                    '& > :not(style)': { width: '50ch' },
                  }} value={plants.find((e) => {return Number(e.plantNo) === Number(text.plantNo.plantNo);})?.plantCharge||0}/>
    </Box>
    </Box>
    <div className="rental">
            <button type='button'className='button1' name="rent_regidate" onClick={newRentalSave} onChange={onChange}>신청</button>
            <button type='button' value='취소' className="button2" onClick={handleRedirect} >취소</button>
        </div>
      </div>
    </div>   
    </React.Fragment>
  );
}