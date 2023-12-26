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
import ChangeInformation from './js/component/UserPage/ChangeInformation'
import FindId from './js/component/Login/FindId'
import AddCorp from './js/component/UserPage/AddCorp'
import UserList from './js/component/UserPage/UserList'
import Redirect from './Redirect';
function App() {
  const token = sessionStorage.getItem("Authorization");
  return (
    <div className="App">
      <Router>
        <Header />{/* 여기에 있어야 헤더에서 다른 페이지로 이동기능 사용이 가능함 */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/pageTest" element={<PageTest />} />
          <Route path="/adminPage/:props" element={<Redirect component={<AdminPage/>} authenticated={token}/>}/>
          <Route path="/performList" element={<PerformanceList/>}/>
          <Route path="/performanceDetail/:pfCode" element={<PerformanceDetail />} />
          <Route path="/performList/newPerform" element={<Redirect component={<NewPerform />} authenticated={token}/>}/>
          <Route path="/timeList/:pfCode" element={<Redirect component={<TimeList />} authenticated={token}/>} />
          <Route path="/performCalendar" element={<PerformCalendar />} />
          <Route path='/센터소개' element={<CenterInfo />} />
          <Route path='/센터소식' element={<CenterNews/>}/>
          <Route path='/Event' element={<EventPage/>}/>
          <Route path='/FAQ' element={<FAQ />} />
          <Route path='/QNA' element={<QNA />}/>
          <Route path='/NewPost/:BoardType' element={<Redirect component={<NewPost/>} authenticated={token}/>}/>
          <Route path='/NewEventPost/:BoardType' element={<Redirect component={<NewEventPost/>} authenticated={token}/>}/>
          <Route path='/EditPost/:BoardType/:postNo' element={<Redirect component={<EditPost/>} authenticated={token}/>}/>
          <Route path="/EditEventPost/:BoardType/:postNo" element={<Redirect component={<EditEventPost/>} authenticated={token}/>}/>
          <Route path='/postDetail/:BoardType/:postNo' element={<PostDetail/>}/>
          <Route path='/ticket' element={<Redirect component={<Ticket/>} authenticated={token}/>}/>
          <Route path='/RentApp' element={<Redirect component={<RentalApps/>} authenticated={token}/>}/>
          <Route path='/RentList' element={<Redirect component={<RentalList/>} authenticated={token}/>}/>
          <Route path='/Rentcom' element={<Redirect component={<RentalComplete/>} authenticated={token}/>}/>
          <Route path='/myticket' element={<Redirect component={<TicketFind/>} authenticated={token}/>}/>
          <Route path='/Newplant' element={<Redirect component={<Newplant/>} authenticated={token}/>}/>
          <Route path='/errorPage' element={<ErrorPage/>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/userpage/change" element={<Redirect component={<ChangeInformation />} authenticated={token}/>} />
          <Route path="/addcorp" element={<Redirect component={<AddCorp />} authenticated={token}/>}/>
          <Route path="/userList" element={<Redirect component={< UserList />} authenticated={token}/>} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}
export default App;