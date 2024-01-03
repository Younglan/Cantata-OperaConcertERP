import React, {useState, useEffect}from "react";
import cantataLogo from "../../img/cantataLogoBlack.png";
import { useNavigate } from "react-router-dom";
import "../../css/SlideBoard.css"
import { Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const SlideBoard = ({ isOpen, toggleBoard, userRole }) => {
    const [brdDivisions, setBrdDivisions] = useState([]);
    const token = sessionStorage.getItem("jwt");
    const[isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (Object.keys(sessionStorage).length > 0) {
            // sessionStorage에 저장된 값이 하나 이상 있을 때의 처리
            const role = sessionStorage.getItem("role");
            if (role === 'ADMIN') { setIsAdmin(true) }
        } else {
            // sessionStorage에 저장된 값이 하나도 없을 때의 처리
        }

    }, [isAdmin]);
    
    const handleToggle = () => {
        toggleBoard();
    };
    const navigate = useNavigate();
    const goToMain = () => {
        navigate("/");
    }
    const goToCenterInfo = () => {
        navigate("/센터소개");
    }
    const goToBoard = (BoardType) => {
        navigate(`/Board/${BoardType}`)
        handleToggle();//메뉴닫기
    }
   
    const goToPerformanceList = () =>{
        navigate("/performList");
    }
    const goToPerformCalendar = () =>{
        navigate("/performCalendar");
        handleToggle();
    }
    const goToRenalApp = () =>{
        navigate("/RentApp");
    }
    
    const goToAdminPage = (page) =>{
        navigate(`/adminpage/${page}`);
        handleToggle(); // 메뉴 닫기
    }

    useEffect(() => {
        fetchBrdDivisions();
    }, []); // 두 번째 파라미터에 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 호출되도록 함

    // 게시판 목록 가져오기
    const fetchBrdDivisions = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/brd_divisions/allBrd_divisions`);
            if (!response.ok) {
                throw new Error('네트워크가 올바르지 않습니다.');
            }
            const data = await response.json();

            if (data && Array.isArray(data)) {
                setBrdDivisions(data);
            } else {
                setBrdDivisions([]);
            }
        } catch (err) {
            console.error(err);
        };
    };
    
    const loginCheck = () => {
        if(token){
            sessionStorage.clear();
            alert("로그아웃 되었습니다.")
            navigate("/");
            handleToggle();
        }else{
            navigate("/login");
            handleToggle();
        }
    }
    return (
        <div className='Over_background'>
            <div className={`slide_board ${isOpen ? 'open' : 'close'}`}>
                <div className='slide_Header'>
                    <div className='slide_menu' onClick={handleToggle}> {/*닫기 버튼 이었는데*/}
                        <div className="slide_bar"></div>
                        <div className="slide_bar"></div>
                        <div className="slide_bar"></div>
                    </div>  {/*햄버거 메뉴버튼 아이콘*/}
                    <div className="slide_title">
                        <img src={cantataLogo} alt="Cantata Logo" onClick={() => { goToMain(); handleToggle(); }} />
                    </div>
                    <div className="slide_right">
                        <div className="slide_login" onClick={loginCheck}>
                            {token?<LogoutIcon style={{height:"50px",width:"50px"}}/>:<svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" transform='rotate(180)'>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>}{/*로그인 svg파일 transform = 'rotate(90)'으로 180도 회전상태*/}
                        </div>

            <div className="slide_search">
              <svg
                width="50px"
                height="50px"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                transform="rotate(90)"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              {/*돋보기 svg파일 transform = 'rotate(90)'으로 90도 회전상태*/}
            </div>

            <div className="slide_calender">
              <svg
                width="50px"
                height="50px"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
                onClick={() => {
                  goToPerformCalendar();
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
              {/*달력 svg파일*/}
            </div>
          </div>
        </div>
        <div className="Board">
          <div className="perform_board menu_list">
            <ul>
              <h2>공연</h2>
              <li
                onClick={() => {
                  goToPerformanceList();
                  handleToggle();
                }}
              >
                <h1>공연일정</h1>
              </li>
              <li
                onClick={() => {
                  navigate("/ticket");
                  handleToggle();
                }}
              >
                <h1>온라인예약</h1>
              </li>
            </ul>
          </div>
          <div className="rental_board menu_list">
            <ul>
              <h2>대관</h2>
              <li>
                <h1>대관안내</h1>
              </li>
              <li>
                <h1>대관공고</h1>
              </li>
              <li
                onClick={() => {
                  goToRenalApp();
                  handleToggle();
                }}
              >
                <h1>대관신청</h1>
              </li>
            </ul>
          </div>
          <div className="center_board menu_list">
                        <ul>
                            <h2>소식/고객센터</h2>
                            {brdDivisions.map((brdDivision, index) => (
                                (brdDivision.brdNo !== 1 && brdDivision.brdNo !== 2) && // BrdNo가 1, 2인 경우에는 건너뜀
                                <li key={index} onClick={() => goToBoard(brdDivision.brdNo)}>
                                    <h1>{brdDivision.brdName}</h1>
                                </li>
                            ))}
                        </ul>
                    </div>
          <div className="intro_board menu_list">
            <ul>
              <h2>기관소개</h2>
              <li
                onClick={() => {
                  goToCenterInfo();
                  handleToggle();
                }}
              >
                <h1>센터소개</h1>
              </li>
              <li>
                <h1>시설소개</h1>
              </li>
            </ul>
          </div>
          {userRole === "admin" && ( //특정권한 확인 admin일 경우에만 보임
            <div className="manager_board menu_list">
              <ul>
                <h2>관리자메뉴</h2>
                <li onClick={() => goToAdminPage("adminPerformances")}>
                  <h1>공연관리</h1>
                </li>
                <li>
                  <h1>예매관리</h1>
                </li>
                <li>
                  <h1>대관관리</h1>
                </li>
                <li>
                  <h1>회원관리</h1>
                </li>
                <li onClick={() => goToAdminPage("adminContents")}>
                  <h1>홈페이지 컨텐츠 관리</h1>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="over" onClick={handleToggle} />
    </div>
  );
};
export default SlideBoard;
