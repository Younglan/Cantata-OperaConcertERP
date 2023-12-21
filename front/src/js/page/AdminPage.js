import React, { useState } from 'react';
import "../../css/AdminPage.css";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Board from "../component/Board";
import PerformanceList from '../component/performance/PerformanceList';
const AdminPage = () => {
    const [isContentMenuVisible, setContentMenuVisible] = useState(null);
    const [selectedBoard, setSelectedBoard] = useState(null);

    const toggleContentMenu = (board) => {
        setContentMenuVisible(board);
    }

    const setSelectedMenu = (boardType) => {
        setSelectedBoard(boardType);
    };

    return (
        <div className="AdminPage">
            <ButtonGroup aria-label="Basic example">
                <Button variant="secondary" onClick={() => toggleContentMenu(0)}>공연관리</Button>
                <Button variant="secondary" onClick={() => toggleContentMenu(1)}>예약관리</Button>
                <Button variant="secondary" onClick={() => toggleContentMenu(2)}>대관관리</Button>
                <Button variant="secondary" onClick={() => toggleContentMenu(3)}>회원관리</Button>
                <Button variant="secondary" onClick={() => toggleContentMenu(4)}>홈페이지컨텐츠관리</Button>
            </ButtonGroup>
            {/* 공연관리 버튼에 대한 ButtonGroup */}
            {isContentMenuVisible === 0 && (
                <ButtonGroup aria-label="PerformanceMenu">
                    <Button variant="secondary" onClick={() => setSelectedMenu(0)}>공연일정</Button>
                    <Button variant="secondary">옵션2</Button>
                    <Button variant="secondary">옵션3</Button>
                </ButtonGroup>
            )}

            {/* 예약관리 버튼에 대한 ButtonGroup */}
            {isContentMenuVisible === 1 && (
                <ButtonGroup aria-label="ReservationMenu">
                    <Button variant="secondary">옵션A</Button>
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
                <ButtonGroup aria-label="ContentMenu">
                    <Button variant="secondary" onClick={() => setSelectedMenu(1)}>
                        센터소개
                    </Button>
                    <Button variant="secondary" onClick={() => setSelectedMenu(2)}>
                        시설소개
                    </Button>
                    <Button variant="secondary" onClick={() => setSelectedMenu(3)}>
                        센터소식
                    </Button>
                    <Button variant="secondary" onClick={() => setSelectedMenu(4)}>
                        이벤트
                    </Button>
                    <Button variant="secondary" onClick={() => setSelectedMenu(5)}>
                        자주하는 질문
                    </Button>
                    <Button variant="secondary" onClick={() => setSelectedMenu(6)}>
                        1:1문의
                    </Button>
                </ButtonGroup>
            )}

            <div className="content">
                {selectedBoard !== null && selectedBoard >= 1 && selectedBoard <= 6 && <Board BoardType={selectedBoard} />}
                {selectedBoard !== null && selectedBoard === 0 && <PerformanceList />}
            </div>

        </div>
    );
};

export default AdminPage;
