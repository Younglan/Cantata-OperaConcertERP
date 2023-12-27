import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import cantataLogo from '../../img/cantataLogo.png';
import SlideBoard from './SlideBoard';
import "../../css/Header.css";
import { Avatar } from '@mui/material';

const Header = () => {
    const token = sessionStorage.getItem("jwt");
    const [isBoardOpen, setIsBoardOpen] = useState(false);
    const [userRole] = useState('member'); //특정권한 확인용 임시코드 'admin'으로 바꾸면 관리자 메뉴가 나타난다.
    const toggleBoard = () => {
        setIsBoardOpen(!isBoardOpen);
    };

    const navigate = useNavigate();

    const goToMain = () =>{
        navigate("/");
    }
    const goToPerformCalendar = () =>{
        navigate("/performCalendar");
    }
    const loginCheck = () => {
        if(token){
            navigate("/mypage");
        }else{
            navigate("/login");
        }
    }

    return (
        <div className='Header'>
            <div className='header_menu' onClick = {toggleBoard}> 
                <div className = "bar"></div>
                <div className = "bar"></div>
                <div className = "bar"></div>
            </div>  {/*햄버거 메뉴버튼 아이콘*/}
            <div className="header_title">
                <img src={cantataLogo} alt="Cantata Logo" onClick={goToMain} />
            </div>
            <div className="header_right">
                <div className="login" onClick={loginCheck}>
                    {token?<Avatar src="/broken-image.jpg"/>:<svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" transform='rotate(180)'>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>}{/*로그인 svg파일 transform = 'rotate(90)'으로 180도 회전상태*/}
                </div>

                <div className="search">
                    <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" transform='rotate(90)' >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>{/*돋보기 svg파일 transform = 'rotate(90)'으로 90도 회전상태*/}
                </div>

                <div className="calender">
                    <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" onClick={goToPerformCalendar}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                    </svg>{/*달력 svg파일*/}
                </div>
            </div>
            {isBoardOpen && <SlideBoard isOpen = {isBoardOpen} toggleBoard={toggleBoard} userRole = {userRole}/>}
        </div>
    );
};
export default Header;