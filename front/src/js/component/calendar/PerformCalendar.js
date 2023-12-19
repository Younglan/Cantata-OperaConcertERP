// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import Toolbar from './Toolbar';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './PerformCalendar.css';

class PerformCalendar extends Component {
    render() {
        return (
          <div className="App">
            <FullCalendar 
              defaultView="dayGridMonth" 
              plugins={[ dayGridPlugin ]}
              events={[
                { title: 'event 1', date: '2023-12-01' },
                { title: 'event 2', date: '2023-12-03' }
            ]}
            />
          </div>
        );
    }
}

export default PerformCalendar;