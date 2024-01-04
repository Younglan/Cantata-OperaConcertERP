// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import Toolbar from './Toolbar';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { Component,useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko'; // 한글 locale 추가
import './PerformCalendar.css';


const SERVER_URL='http://localhost:8090';

function PerformCalendar (){
  const navigate = useNavigate();
  const [times, setTimes] = useState([]);
  
  useEffect(() => {
    fetchTimeList();
  }, []);

  const fetchTimeList= () => {
    fetch(SERVER_URL+'/perform_times/allTimeList')
    .then(response => response.json())
    .then(data => {
            //상태 체크 후 pfStatus가 ture인것만 표시
            const filteredTimes 
              = data.filter((pfTimes) => pfTimes.ptStatus === true && pfTimes.pfCode.expose ===true).reverse();
            setTimes(filteredTimes);
    })
    .catch(err => {
      console.error(err);
      navigate("/errorPage");
  });
  };

  const handleEventClick = (eventInfo) => {
    const eventData = eventInfo.event;
    const pfcode = eventData.extendedProps.link;
    navigate("/performanceDetail/"+pfcode);
  };
    
  return (
    <div className='contentsArea'>
      <div className='contents'>
        <FullCalendar 
          defaultView="dayGridMonth" 
          plugins={[ dayGridPlugin ]}
          locale={koLocale}
          events={times.map((time) => ({
            title: time.pfCode.pfTitle,
            date: time.ptDate,
            extendedProps: {
              link: time.pfCode.pfCode,
            },
          }))}
          eventClick={handleEventClick} // 클릭 이벤트 핸들러 추가
        />
      </div>
    </div>
  );
}

export default PerformCalendar;