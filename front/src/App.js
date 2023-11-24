import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './js/layout/Header';
import Footer from './js/layout/Footer';
import Main from './js/page/Main';
import PageTest from './js/page/PageTest';
import CenterInfo from './js/page/CenterInfo';
import AdminPage from './js/page/AdminPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/pageTest" element={<PageTest />} />
          <Route path='/센터소개' element={<CenterInfo />}/>
          <Route path='/관리자페이지' element={<AdminPage/>}/>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
