import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './js/layout/Header';
import Footer from './js/layout/Footer';
import Main from './js/page/Main';
import PageTest from './js/page/pageTest';
import AdminPage from './js/page/AdminPage';
import PerformanceDetail from './js/component/performance/PerformanceDetail';
import PerformanceList from './js/component/performance/PerformanceList';
import NewPerform from './js/component/performance/NewPerform';
import TimeList from './js/component/performTime/TimeList';
import CenterInfo from './js/page/CenterInfo';
import CenterNews from './js/page/CenterNews';
import EventPage from './js/page/EventPage';
import Ticket from './js/component/Ticket/Ticket';
import RentalApps from './js/component/rental/rental';
import RentalList from './js/component/rental/RentalList';
import RentalComplete from './js/component/rental/RentalComplete';
import TicketFind from './js/component/Ticket/TicketFind';
import Newplant from './js/component/plant/NewPlant';
import PerformCalendar from './js/component/calendar/PerformCalendar';
import ErrorPage from './js/page/ErrorPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />{/* 여기에 있어야 헤더에서 다른 페이지로 이동기능 사용이 가능함 */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/pageTest" element={<PageTest />} />
          <Route path="/adminPage" element={<AdminPage/>}/>
          <Route path="/performList" element={<PerformanceList />} />
          <Route path="/performList/newPerform" element={<NewPerform />} />
          <Route path="/performanceDetail/:pfCode" element={<PerformanceDetail />} />
          <Route path="/timeList/:pfCode" element={<TimeList />} />
          <Route path="/performCalendar" element={<PerformCalendar />} />
          <Route path='/센터소개' element={<CenterInfo />} />
          <Route path='/센터소식' element={<CenterNews/>}/>
          <Route path='/Event' element={<EventPage/>}/>
          <Route path='/ticket' element={<Ticket/>}/>
          <Route path='/RentApp' element={<RentalApps/>}/>
          <Route path='/RentList' element={<RentalList/>}/>
          <Route path='/Rentcom' element={<RentalComplete/>}/>
          <Route path='/myticket' element={<TicketFind/>}/>
          <Route path='/Newplant' element={<Newplant/>}/>
          <Route path='/errorPage' element={<ErrorPage/>}/>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}
export default App;