import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './js/layout/Header';
import Footer from './js/layout/Footer';
import Main from './js/page/Main';
import PageTest from './js/page/PageTest';
import AdminPage from './js/page/AdminPage';
import PerformanceDetail from './js/component/performance/PerformanceDetail';
import PerformanceList from './js/component/performance/PerformanceList';
import NewPerform from './js/component/performance/NewPerform';
import TimeList from './js/component/performTime/TimeList';
import CenterInfo from './js/page/CenterInfo';
import CenterNews from './js/page/CenterNews';
import EventPage from './js/page/EventPage';
import NewPost from './js/component/NewPost';
import NewEventPost from './js/component/NewEventPost';
import EditPost from './js/component/EditPost';
import EditEventPost from './js/component/EditEventPost';
import PostDetail from './js/component/PostDetail';
import FAQ from "./js/page/FAQ";
import QNA from "./js/page/QNA";
import Ticket from './js/component/Ticket/Ticket';
import RentalApps from './js/component/rental/rental';
import RentalList from './js/component/rental/RentalList';
import RentalComplete from './js/component/rental/RentalComplete';
import TicketFind from './js/component/Ticket/TicketFind';
import Newplant from './js/component/plant/NewPlant';
import PerformCalendar from './js/component/calendar/PerformCalendar';
import ErrorPage from './js/page/ErrorPage';
import LoginPage from './js/component/Login/LoginPage';
import SignUp from './js/component/Login/SignUp';
import AddCorp from './js/component/UserPage/AddCorp'

import Redirect from './Redirect';
import Mypage from './js/component/UserPage/Mypage';
function App() {
  
 
  return (
    <div className="App">
      <Router>
        <Header />{/* 여기에 있어야 헤더에서 다른 페이지로 이동기능 사용이 가능함 */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/pageTest" element={<PageTest />} />
          <Route path="/adminPage/:props" element={<Redirect component={<AdminPage/>}/>}/>
          <Route path="/performList" element={<PerformanceList/>}/>
          <Route path="/performanceDetail/:pfCode" element={<PerformanceDetail />} />
          <Route path="/performList/newPerform" element={<Redirect component={<NewPerform />} />}/>
          <Route path="/timeList/:pfCode" element={<Redirect component={<TimeList />} />} />
          <Route path="/performCalendar" element={<PerformCalendar />} />
          <Route path='/센터소개' element={<CenterInfo />} />
          <Route path='/센터소식' element={<CenterNews/>}/>
          <Route path='/Event' element={<EventPage/>}/>
          <Route path='/FAQ' element={<FAQ />} />
          <Route path='/QNA' element={<QNA />}/>
          <Route path='/NewPost/:BoardType' element={<Redirect component={<NewPost/>} />}/>
          <Route path='/NewEventPost/:BoardType' element={<Redirect component={<NewEventPost/>} />}/>
          <Route path='/EditPost/:BoardType/:postNo' element={<Redirect component={<EditPost/>} />}/>
          <Route path="/EditEventPost/:BoardType/:postNo" element={<Redirect component={<EditEventPost/>} />}/>
          <Route path='/postDetail/:BoardType/:postNo' element={<PostDetail/>}/>
          <Route path='/ticket' element={<Redirect component={<Ticket/>} />}/>
          <Route path='/RentApp' element={<Redirect component={<RentalApps/>} />}/>
          <Route path='/RentList' element={<Redirect component={<RentalList/>} />}/>
          <Route path='/Rentcom' element={<Redirect component={<RentalComplete/>} />}/>
          <Route path='/myticket' element={<Redirect component={<TicketFind/>} />}/>
          <Route path='/Newplant' element={<Redirect component={<Newplant/>} />}/>
          <Route path='/errorPage' element={<ErrorPage/>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<Redirect component={<Mypage />} />} />
          <Route path="/addcorp" element={<Redirect component={<AddCorp />} />}/>
          <Route path="/admin" element={<Redirect component={<AdminPage />} />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}
export default App;