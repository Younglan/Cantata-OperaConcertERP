import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../../css/AdminPage.css";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Board from "../component/Board/Board";
import PerformanceList from '../component/performance/PerformanceList';
import RentalListad from '../component/rental/RentalListad';
import UserList from '../component/UserPage/UserList';
import TicketAdmin from '../component/Ticket/TicketAdmin';
import PerformAdminMenu from '../component/performance/PerformAdminMenu';
import PlantList from '../component/plant/PlantList';
const SERVER_URL = 'http://localhost:8090';
// import TicketCheck from '../component/Ticket/TicketCheck';
const AdminPage = () => {
    const [isContentMenuVisible, setContentMenuVisible] = useState(null);
    const [selectedBoard, setSelectedBoard] = useState(null);
   
    
    const [brdDivisions, setBrdDivisions] = useState([]);
    const { props } = useParams(); 

    useEffect(() => {
        // setSelectedBoard(1);
        
        if (props === 'adminContents') {
            setContentMenuVisible(4);
            setSelectedBoard(1);
        } else if (props === 'adminPerformances') {
            setContentMenuVisible(0);
            setSelectedBoard(1);
        }
        else if (props === 'adminRentals') {
            setContentMenuVisible(2);
            setSelectedBoard(1);
        }else if (props === 'adminUsers') {
            setContentMenuVisible(3);
            setSelectedBoard(1);
        }else if (props === 'adminTicket'){
            setContentMenuVisible(1);
            setSelectedBoard(1);
        }else if (props === 'adminPlantList'){
            setContentMenuVisible(5);
            setSelectedBoard(1);
        }
        
    }, [props]);

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

    // isContentMenuVisible이 바뀔 때마다 selectedBoard에 1 할당
    useEffect(() => {
        setSelectedBoard(1);
    }, [isContentMenuVisible]);
    
    return (
        <div className="AdminPage">
            <ButtonGroup aria-label="Basic example">
                <Button variant="secondary" onClick={() => setContentMenuVisible(0)}>공연관리</Button>
                <Button variant="secondary" onClick={() => setContentMenuVisible(1)}>예약관리</Button>
                <Button variant="secondary" onClick={() => setContentMenuVisible(5)}>시설관리</Button>
                <Button variant="secondary" onClick={() => setContentMenuVisible(2)}>대관관리</Button>
                <Button variant="secondary" onClick={() => setContentMenuVisible(3)}>회원관리</Button>
                <Button variant="secondary" onClick={() => setContentMenuVisible(4)}>홈페이지컨텐츠관리</Button>
            </ButtonGroup>
            {/* 공연관리 버튼에 대한 ButtonGroup */}
            {isContentMenuVisible === 0 && (
                <ButtonGroup aria-label="PerformanceMenu">
                    <Button variant="secondary" onClick={() => setSelectedBoard(1)}>공연일정</Button>
                    <Button variant="secondary" onClick={() => setSelectedBoard(2)}>전체 회차 리스트</Button>

                </ButtonGroup>
            )}

            {/* 예약관리 버튼에 대한 ButtonGroup */}
            {isContentMenuVisible === 1 && (
                <ButtonGroup aria-label="ReservationMenu">
                    <Button variant="secondary" onClick={()=> setSelectedBoard(1)}>티켓 관리</Button>
                    <Button variant="secondary">옵션B</Button>
                    <Button variant="secondary">옵션C</Button>
                </ButtonGroup>
            )}

            {/* 대관관리 버튼에 대한 ButtonGroup */}
            {isContentMenuVisible === 2 && (
                <ButtonGroup aria-label="RentalMenu">
                    <Button variant="secondary">옵션X</Button>
                    <Button variant="secondary">옵션Y</Button>
                    <Button variant="secondary">옵션Z</Button>
                </ButtonGroup>
            )}

            {/* 회원관리 버튼에 대한 ButtonGroup */}
            {isContentMenuVisible === 3 && (
                <ButtonGroup aria-label="MemberMenu">
                    <Button variant="secondary">회원목록</Button>
                </ButtonGroup>
            )}

            {isContentMenuVisible === 4 && (
                <div>
                    <ButtonGroup aria-label="ContentMenu">
                        {brdDivisions.map((brdDivision, index) => (
                            <Button key={index} variant="secondary" onClick={() => setSelectedBoard(brdDivision.brdNo)}>
                                {brdDivision.brdName}
                            </Button>
                        ))}
                    </ButtonGroup>
                </div>
            )}
             {/* 시설관리 버튼에 대한 ButtonGroup */}
             {isContentMenuVisible === 5 && (
                <ButtonGroup aria-label="PlantMenu">
                    <Button variant="secondary">옵션X</Button>
                    <Button variant="secondary">옵션Y</Button>
                    <Button variant="secondary">옵션Z</Button>
                </ButtonGroup>
            )}

            <div className="content">
                {selectedBoard !== null && isContentMenuVisible === 0 && <PerformAdminMenu ListType={selectedBoard} />}
                {/* {selectedBoard !== null && isContentMenuVisible === 1 && <예약관리 페이지 />} */}
                {selectedBoard !== null && isContentMenuVisible === 2 && <RentalListad />}
                {selectedBoard !== null && isContentMenuVisible === 5&&<PlantList/>}
                {selectedBoard !== null && isContentMenuVisible === 1&&<TicketAdmin/>}
                {selectedBoard !== null && isContentMenuVisible === 3 && <UserList/>}
                {selectedBoard !== null && isContentMenuVisible === 4 && <Board BoardType={selectedBoard} />}

            </div>

        </div>
    );
};

export default AdminPage;
