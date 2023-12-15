import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Toolbar from './Toolbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const PerformCalendar = () => {
    moment.locale('ko-KR');
    const localizer = momentLocalizer(moment);

    return (
        <Calendar
          localizer={localizer}
        //   events={myEventsList}
          style={{ height: 500 }}
          components={{
            toolbar: Toolbar,
          }}
        />
    )
}

export default PerformCalendar;