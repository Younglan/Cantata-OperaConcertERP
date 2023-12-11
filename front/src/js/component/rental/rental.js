import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import './css/rental.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiCalendarDate } from "react-icons/ci";
import Paper from '@mui/material/Paper';
import Form from 'react-bootstrap/Form';
import { Grid,styled} from '@mui/material';
import {useNavigate} from "react-router-dom";
import moment from 'moment/moment';


const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'black' ? 'gray' : 'white',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
export default function RentalApps() {
  const [text, setText] = useState({
    rent_name:"",
    rent_start:`${moment(new Date()).format("yyyy-MM-DD")}`,
    rent_end:`${moment(new Date()).format("yyyy-MM-DD")}`,
    // payment:0,
  });
    const SERVER_URL='http://localhost:8090';

    const navigate = useNavigate();

    

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
      fetch(SERVER_URL+'/rental',
      {
          method:'POST',
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify({ 
          rent_name:"",
          rent_start:"",
          rent_end:""
          ,})
      })
      .then(response => response.json())
      .then(response =>{console.log(response)
          if(response){
              alert('저장완료.');
              navigate("/RentList");
              
          }else{
              alert('저장되지않았습니다.');
          }
      })
      .catch(err => console.error(err))
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
        
        <Form.Select aria-label="Default select example" className="fullwidth" name="place">
                        <option value="">장소선택</option>
                        <option value="무대">무대</option>
                        <option value="리허설실">리허설실</option>
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
    <Box
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
    </Box>
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
              
              selected={new Date(text.rent_start)}
              onChange={(e) =>{setText({...text,
                rent_start:`${moment(e).format("yyyy-MM-DD")}`,
                })}}
              value={new Date(text.rent_start)}
              name='rent_start'
              selectsStart
              startDate={new Date(text.rent_start)}
              />
        <CiCalendarDate />
      </div>
      <div>
      <h2>대관종료일</h2>
        <DatePicker 
              label="대관종료일"
              selected={new Date(text.rent_end)}
              onChange={(e) =>{console.log(moment(e).format("yyyy-MM-DD"));
                setText({...text,
                rent_end:`${moment(e).format("yyyy-MM-DD")}`,
                });
              }}
              name='rent_end'
              value={new Date(text.rent_end)}
              selectsEnd
              endDate={new Date(text.rent_end)}
              minDate={new Date(text.rent_start)}/>
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
      <TextField id="input1" variant="outlined" onChange={onChange} value={text.payment} name = "payment" sx={{
                    '& > :not(style)': { width: '50ch' },
                  }}/>
    </Box>
    </Box>
    <div className="rental">
            <button type='button' className="button1" onClick={newRentalSave} >신청</button>
            <button type='button' value='취소' className="button2" onClick={handleRedirect} >취소</button>
        </div>
      </div>
    </div>   
    </React.Fragment>
  );
}