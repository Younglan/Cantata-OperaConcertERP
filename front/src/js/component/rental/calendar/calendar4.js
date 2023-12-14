import React,{useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiCalendarDate } from "react-icons/ci";
import styled from 'styled-components';


const Mycalendar4 = () =>{
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const Datename = styled.h1`
    font-size: 1rem;
    background: white;`;
  return (
    <section>
      <div>철수기간</div>
      <div>
        <Datename>철수시작일</Datename>
        <DatePicker 
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}/>
              <CiCalendarDate />
      </div>
      <div>
      <Datename>철수종료일</Datename>
        <DatePicker 
              selected={endDate}
              onChange={(date) => setendDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}/>
               <CiCalendarDate />
      </div>
      </section>
  );
}
export default Mycalendar4;